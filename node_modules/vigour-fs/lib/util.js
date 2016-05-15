'use strict'
var nodeUrl = require('url')
var http = require('http')
var https = require('https')
var url = require('url')
var through = require('through2')
var concat = require('concat-stream')
var ajax = require('./ajax')

module.exports = exports

exports.url = function (str) {
  return /^https?:\/\//.test(str)
}

exports.defaults = function (options) {
  var defaults = [
    { k: 'followRedirects', v: true },
    { k: 'maxTries', v: 1 },
    { k: 'retryDelayType', v: 'exp' },
    { k: 'retryDelay', v: 500 },
    { k: 'retryOn404', v: false },
    { k: 'respectRetryAfter', v: true },
    { k: 'maxRetryDelay', v: 60000 },
    { k: 'timeout', v: 5000 },
    { k: 'mkdirp', v: false }
  ]
  var l = defaults.length
  var i

  if (typeof options === 'string') {
    options = { 'encoding': options }
  }
  for (i = 0; i < l; i += 1) {
    if (!(defaults[i].k in options)) {
      options[defaults[i].k] = defaults[i].v
    }
  }
  return options
}

exports.readHttp = function (url, options, cb) {
  exports.getRetry(url, options, function (err, throughStream) {
    if (err) {
      cb(err)
    } else {
      throughStream.pipe(concat(function (data) {
        cb(null, (options.encoding === 'utf8') ? data.toString() : data)
      }))
    }
  })
}

exports.readAjax = function (url, options, cb) {
  exports.ajaxRetry(url, options, function (err, data) {
    if (err) {
      cb(err)
    } else {
      cb(null, data)
    }
  })
}

exports.getRetry = function (url, options, cb) {
  exports.retryFactory(exports.get, options)(url, options, cb)
}

exports.ajaxRetry = function (url, options, cb) {
  exports.retryFactory(exports.ajaxGet, options)(url, options, cb)
}

exports.ajaxGet = function (url, options, cb) {
  ajax({
    url: url,
    complete: function (data, xhrProgressEvent) {
      return setupRetry(xhrProgressEvent.target.status
        , xhrProgressEvent.target.getResponseHeader('Retry-After')
        , xhrProgressEvent.target.getResponseHeader('Location')
        , options
        , function (err) {
          if (err) {
            cb(err)
          } else {
            cb(null, data)
          }
        })
    },
    error: function (err) {
      return cb(err)
    }
  })
}

exports.get = function (url, options, cb) {
  var throughStream = through()
  var callback = once(cb)
  var reqOpts = nodeUrl.parse(url)
  if (options.headers) {
    reqOpts.headers = options.headers
  }
  var req = (/^https/.test(url) ? https : http).get(reqOpts
    , function (res) {
      res.on('error', callback)
      return setupRetry(res.statusCode
        , res.headers['retry-after']
        , res.headers['location']
        , options
        , function (err) {
          if (err) {
            res.resume()
            return callback(err)
          } else {
            res.pipe(throughStream)
            return callback(null, throughStream)
          }
        })
    })
  req.on('socket', function (socket) {
    socket.setTimeout(options.timeout)
    socket.on('timeout', function () {
      req.abort()
    })
  })
  req.on('error', callback)
}

function once (cb) {
  var called = false
  return function () {
    if (called) return
    called = true
    return cb.apply(this, arguments)
  }
}

function setupRetry (statusCode, retryAfter, location, options, cb) {
  var error,
    parsed,
    diff,
    date
  if (statusCode === 500 ||
    statusCode === 503 ||
    (options.retryOn404 && statusCode === 404)) {
    error = new Error('Remote server error (' + statusCode + ')')
    error.statusCode = statusCode
    error.retry = true
    if (retryAfter) {
      error.retryAfterContent = retryAfter
      parsed = parseInt(retryAfter, 10)
      if (parsed) {
        error.retryAfter = parsed * 1000
      } else {
        parsed = (new Date(retryAfter)).getTime()
        if (parsed) {
          date = new Date()
          diff = parsed - date.getTime()
          if (diff > 0) {
            error.retryAfter = diff
          }
        }
      }
      if (error.retryAfter > options.maxRetryDelay) {
        error.retry = false
        error.message += '; Retry-After delay over maxRetryDelay'
      }
    }
    return cb(error)
  } else if (location &&
    options.followRedirects &&
    (statusCode === 301 ||
    statusCode === 302 ||
    statusCode === 303 ||
    statusCode === 305 ||
    statusCode === 307 ||
    statusCode === 308)) {
    error = new Error('Remote server error (' + statusCode + ')')
    error.statusCode
    error.retry = true
    error.location = location
    return cb(error)
  } else if (statusCode === 200) {
    return cb(null)
  } else {
    error = new Error('Error GETting url. StatusCode: ' + statusCode)
    error.statusCode = statusCode
    error.retry = false
    return cb(error)
  }
}

exports.retryFactory = function (fn, options) {
  return function () {
    var tryNb = 0
    var args = [].slice.call(arguments)
    var cb = args.pop()

    attempt()

    function attempt (location) {
      if (location) {
        args[0] = location
      }
      fn.apply(null, args.concat(function (err, throughStream) {
        var error,
          retryDelay,
          target

        if (err) {
          if (err.retry) {
            if (err.location) {
              target = url.parse(args[0])
              target.pathname = err.location
              attempt(url.resolve(target.protocol + (target.slashes ? '//' : '') + (target.auth ? target.auth + '@' : '') + target.host, err.location))
            } else {
              if (tryNb >= options.maxTries) {
                error = err
                error.message += '. Maximum number of attempts reached'
                error.maxTries = options.maxTries
                return cb(error)
              } else {
                if (options.respectRetryAfter && err.retryAfter) {
                  retryDelay = err.retryAfter
                } else if (options.retryDelayType === 'exp') {
                  retryDelay = options.retryDelay * Math.pow(2, tryNb)
                } else if (options.retryDelayType === 'linear') {
                  retryDelay = options.retryDelay * tryNb
                } else /* if (options.retryDelayType === 'constant') */ {
                  retryDelay = options.retryDelay
                }
                tryNb += 1
                if (retryDelay > options.maxRetryDelay) {
                  retryDelay = options.maxRetryDelay
                }
                setTimeout(attempt, retryDelay)
              }
            }
          } else {
            error = err
            return cb(error)
          }
        } else {
          return cb(null, throughStream)
        }
      }))
    }
  }
}
