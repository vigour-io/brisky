var express = require('express')
  , _port = 8000
  , retryNb = 0

function createDate (timestamp) {
  var dayNames = [
      'Sun'
      , 'Mon'
      , 'Tue'
      , 'Wed'
      , 'Thu'
      , 'Fri'
      , 'Sat']
    , monthNames = [
      'Jan'
      , 'Feb'
      , 'Mar'
      , 'Apr'
      , 'May'
      , 'Jun'
      , 'Jul'
      , 'Aug'
      , 'Sep'
      , 'Oct'
      , 'Nov'
      , 'Dec'
    ]
    , date = new Date(timestamp)
    , pad = function (nb) {
      return (nb < 10) ? "0" + nb : nb
    }
  return dayNames[date.getUTCDay()]
    + ", "
    + date.getUTCDate()
    + " "
    + monthNames[date.getUTCMonth()]
    + " "
    + date.getUTCFullYear()
    + " "
    + pad(date.getUTCHours())
    + ":"
    + pad(date.getUTCMinutes())
    + ":"
    + pad(date.getUTCSeconds())
    + " "
    + "GMT"
}

function middleFactory (retryVar, name) {
  return function middle (req, res, next) {
    if (retryVar === 0) {
      retryVar += 1
      // log.info(name + ' responding with 404')
      res.status(404).end()
    } else if (retryVar === 1) {
      retryVar += 1
      // log.info(name + ' responding with 500')
      res.status(500).end()
    } else if (retryVar === 2) {
      retryVar += 1
      // log.info(name + ' responding with 503 (1 second)')
      res.setHeader('Retry-After', 1)
      res.status(503).end()
    } else if (retryVar === 3) {
      retryVar += 1
      // log.info(name + ' responding with 503 (no retry-after header)')
      res.status(503).end()
    } else if (retryVar === 4) {
      retryVar += 1
      // log.info(name + ' responding with 503 (HTTP-date in 0.5 seconds)')
      res.setHeader('Retry-After', createDate(Date.now() + 500))
      res.status(503).end()
    } else if (retryVar === 5) {
      retryVar += 1
      // log.info(name + ' responding with 503 (HTTP-date in the past)')
      res.setHeader('Retry-After', "Tue, 11 Sep 2001 23:59:59 GMT")
      res.status(503).end()
    } else if (retryVar === 6) {
      retryVar += 1
      // log.info(name + ' responding with 503 (invalid HTTP-date)')
      res.setHeader('Retry-After', "Sat, 11 Sep 2001 23:59:59 GMT")
      res.status(503).end()
    } else if (retryVar === 7) {
      retryVar += 1
      // log.info(name + ' responding with 500')
      res.status(500).end()
    } else if (retryVar === 8) {
      retryVar += 1
      // log.info(name + ' responding with 500')
      res.status(500).end()
    } /*else if (retryVar === 9) {
      retryVar += 1
      // log.info(name + ' responding with 503 (HTTP-date too far out)')
      res.setHeader('Retry-After', "Fri, 1 Jan 2100 23:59:59 GMT")
      res.status(503).end()
    } */else {
      res.status(200).end(name + ' done')
    }
  }
}

module.exports = exports = function (name, port) {
  var app = express()
  if (port) {
    _port = port
  }

  app.use(middleFactory(retryNb, name))

  console.log(name + ' server listening on port ' + _port)
  return app.listen(_port)
}



