var util = require('./util')
var path = require('path')
var xml2js = require('xml2js')
var parseXmlString = xml2js.parseString
var xmlBuilder = new xml2js.Builder({headless: true})
var readFile
var writeFile
var exists

// Start with graceful-fs
module.exports = exports = require('graceful-fs')

// extras

exports.remove = require('rimraf')

exports.mkdirp = require('mkdirp')

exports.prependFile = require('prepend-file')

// Modifications

// Store original graceful-fs method
readFile = exports.readFile

exports.readFile = function (pth, options, cb) {
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  ;(options.url !== false && util.url(pth))
    ? util.readHttp(pth, options, cb)
    : readFile(pth, options, cb)
}

// Store original graceful-fs method
writeFile = exports.writeFile

exports.writeFile = function (pth, data, options, cb) {
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  if (options.mkdirp) {
    var dirPath = pth.slice(0, pth.lastIndexOf('/'))
    exports.mkdirp(dirPath, function (err) {
      if (err) {
        cb(err)
      } else {
        finish()
      }
    })
  } else {
    finish()
  }

  function finish () {
    if (options.url !== false && util.url(data)) {
      exports.writeHttp(pth, data, options, cb)
    } else {
      writeFile(pth, data, options, cb)
    }
  }
}

exports.writeHttp = function (pth, url, options, cb) {
  util.getRetry(url, options, function (err, throughStream) {
    var file
    if (err) {
      cb(err)
    } else {
      file = exports.createWriteStream(pth)
      throughStream.pipe(file)
      file.on('error', function (err) {
        cb(err)
      })
      file.on('finish', cb)
    }
  })
}

exports.cp = function (src, dest, options, cb) {
  if (!cb) {
    cb = options // TODO js.nodeify
    options = {}
  }
  if (options.mkdirp) {
    var dirPath = dest.slice(0, dest.lastIndexOf('/'))
    exports.mkdirp(dirPath, function (err) {
      if (err) {
        cb(err)
      } else {
        finish()
      }
    })
  } else {
    finish()
  }
  function finish () {
    var rs = exports.createReadStream(src)
    var ws = exports.createWriteStream(dest)
    rs.pipe(ws)
    rs.on('error', cb)
    ws.on('error', cb)
    ws.on('finish', cb)
  }
}

exports.readJSON = function (pth, options, cb) {
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  exports.readFile(pth, options, function (err, data) {
    if (err) {
      cb(err)
    } else {
      var json
      try {
        json = JSON.parse(data)
      } catch (e) {
        e.path = pth
        return cb(e)
      }
      cb(null, json)
    }
  })
}

exports.writeJSON = function (pth, obj, options, cb) {
  var str
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  if (typeof obj === 'string') {
    str = obj
  } else {
    try {
      str = JSON.stringify(obj, options.replacer || null, options.space || null)
    } catch (e) {
      return cb(e)
    }
  }
  exports.writeFile(pth, str, options, cb)
}

exports.editJSON = function (pth, fn, options, cb) {
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  if (options.url !== false && util.url(pth)) {
    var error = new TypeError("editJSON doesn't support urls")
    error.code = 'TypeError'
    throw error
  }
  exports.readJSON(pth, options, function (err, obj) {
    var newObj
    if (err) {
      cb(err)
    } else {
      newObj = fn(obj)
      if (newObj.then) {
        newObj.then(function (val) {
          exports.writeJSON(pth, val, options, cb)
        })
      } else {
        exports.writeJSON(pth, newObj, options, cb)
      }
    }
  })
}

exports.readXML = function (pth, options, cb) {
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  exports.readFile(pth, options, function (err, data) {
    if (err) {
      cb(err)
    } else {
      parseXmlString(data, cb)
    }
  })
}

exports.writeXML = function (pth, obj, options, cb) {
  var str
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  if (typeof obj === 'string') {
    str = obj
  } else {
    try {
      str = xmlBuilder.buildObject(obj)
    } catch (e) {
      return cb(e)
    }
  }
  exports.writeFile(pth, str, options, cb)
}

exports.editXML = function (pth, fn, options, cb) {
  if (!cb) {
    cb = options
    options = {}
  }
  options = util.defaults(options)
  if (options.url !== false && util.url(pth)) {
    var error = new TypeError("editXML doesn't support urls")
    error.code = 'TypeError'
    throw error
  }
  exports.readXML(pth, options, function (err, obj) {
    var newObj
    if (err) {
      cb(err)
    } else {
      newObj = fn(obj)
      if (newObj.then) {
        newObj.then(function (val) {
          exports.writeXML(pth, val, options, cb)
        })
      } else {
        exports.writeXML(pth, newObj, options, cb)
      }
    }
  })
}

// options --- if function -- becomes cb
// options
//
// cb err object can have multiple errors but still parse parts of the object
/*
  {
    exclude: [] *optional
    method:function(pth, field, isDir, obj) // if return true current dir
  }
*/
function exclude (exclude$, field, obj, errs, cb) {
  if (exclude$ instanceof RegExp) {
    if (exclude$.test(field)) {
      if (--obj.rdy === 0) {
        cb(errs, obj.val)
      }
      return true
    }
  } else {
    if (field === exclude$) {
      if (--obj.rdy === 0) {
        cb(errs, obj.val)
      }
      return true
    }
  }
}

exports.walk = function (pth, options, cb, obj, current, field, errs) {
  var method
  if (!cb) {
    cb = options
    options = null
  }
  if (!obj) {
    obj =
      { val: {},
        rdy: 1,
        top: pth
    }
    field = pth
    current = obj.val
  }

  if (options) {
    if (options.exclude) {
      if (options.exclude instanceof Array) {
        for (var i = 0, len = options.exclude.length; i < len; i += 1) {
          if (exclude(options.exclude[i], field, obj, errs, cb)) return
        }
      } else {
        if (exclude(options.exclude, field, obj, errs, cb)) return
      }
    }
    if (options.method) {
      method = options.method
    }
  }

  exports.exists(pth, function (exists) {
    if (!exists) {
      if (!errs) {
        errs = []
      }
      errs.push('file does not exist ' + pth)
      if (--obj.rdy === 0) cb(errs, obj.top ? obj.val[obj.top] : obj.val)
    } else {
      exports.stat(pth, function (err, stats) {
        if (err) {
          if (!errs) {
            errs = []
          }
          errs.push(err)
          if (--obj.rdy === 0) {
            cb(errs, obj.top ? obj.val[obj.top] : obj.val)
          }
        } else {
          if (stats.isDirectory()) {
            exports.readdir(pth, function (err, files) {
              if (err) {
                if (!errs) errs = []
                errs.push(err)
                if (--obj.rdy === 0) {
                  cb(errs, obj.top ? obj.val[obj.top] : obj.val)
                }
              } else {
                if (method && method(pth, field, files, obj, current)) {
                  if (--obj.rdy === 0) {
                    cb(errs, obj.top ? obj.val[obj.top] : obj.val)
                  }
                  return
                }
                current[field] = {}
                files.forEach(function (val) {
                  obj.rdy++
                  exports.walk((pth + '/' + val), options, cb, obj, current[field], val, errs)
                })
              }
              if (--obj.rdy === 0) {
                cb(errs, obj.top ? obj.val[obj.top] : obj.val)
              }
            })
          } else {
            current[field] = true
            ;(method && method(pth, field, false, obj, current))
            if (--obj.rdy === 0) {
              cb(errs, obj.top ? obj.val[obj.top] : obj.val)
            }
          }
        }
      })
    }
  })
}

exports.expandStars = function (src, rootPath) {
  return new Promise(function (resolve, reject) {
    var acc = []
    var nbPending = 0
    var errors = []
    function traverse (obj) {
      var key
      for (key in obj) {
        acc.push(key)
        if (typeof obj[key] === 'object') {
          traverse(obj[key])
        } else if (obj[key] === '*' || obj[key] === true) {
          nbPending += 1
          expand(obj, key, path.join(rootPath, acc.join('/')), expandDone)
        } else if (obj[key] === false) {
          delete obj[key]
        }
        acc.pop()
      }

      function expandDone (err) {
        nbPending -= 1
        done(err)
      }
    }

    traverse(src)
    done()

    function expand (obj, key, rootPath, callback) {
      exports.walk(rootPath, {
        exclude: /^\./
      }
        , function (err, tree) {
          if (err) {
            throw new Error(err)
          }
          obj[key] = tree
          callback(null)
        })
    }

    function done (err) {
      if (err) {
        errors.push(err)
      }
      if (nbPending === 0) {
        if (errors.length === 0) {
          resolve(src)
        } else {
          reject(errors)
        }
      }
    }
  })
}

// Store original graceful-fs method
exists = exports.exists

exports.exists = function (pth, _cb) {
  var cb = _cb
  if (_cb.length === 2) {
    cb = function (exists) {
      _cb(null, exists)
    }
  }
  return exists(pth, cb)
}
