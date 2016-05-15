#!/usr/bin/env node
var fs = require('../../')
  , log = require('npmlog')
  , testServer = require('../testServer.js')
  , readServer
  , writeServer
  , readPort = 8000
  , writePort = 8001
  , retryOptions = {
    maxTries: 10
    , retryDelayType: 'constant'
    , retryDelay: 100
    , retryOn404: true
    , respectRetryAfter: true
    , maxRetryDelay: 1000
  }
  , filesPath = __dirname + '/files/'
  , l
  , i
  , fails
  , nbLeft

log.warn("This script doesn't test the client side version. See tests/client/README.md")

// ---

fs.readFile(filesPath + 'data.txt', function (err, data) {
  if (err) {
    log.error('testing read file', 'Fail ', err)
  } else {
    log.info('testing read file', 'Pass ', data/*.toString()*/)
  }
})

// ---

fs.readFile('http://perdu.com', function (err, data, response) {
  if (err) {
    log.error('testing read url', 'Fail ', err)
  } else {
    log.info('testing read url', 'Pass ', data/*.toString()*/)
  }
})

// ---

fs.writeFile(filesPath + 'out.txt', "File writer's block", function (err) {
  if (err) {
    log.error('testing write file', 'Fail ', err)
  } else {
    log.info('testing write file', 'Pass')
  }
})

// ---

fs.writeFile(filesPath + 'out1.txt', 'http://perdu.com', function (err) {
  if (err) {
    log.error('testing write url', 'Fail ', err)
  } else {
    log.info('testing write url', 'Pass')
  }
})

// ---

fs.mkdirp(filesPath + 'yuz/yub/yubbie', function (err) {
  if (err) {
    log.error('testing mkdirp', 'Fail ', err)
  } else {
    log.info('testing mkdirp', 'Pass')
    fs.remove(__dirname + '/files/yuz', function (err) {
      if (err) {
        log.error('testing remove', 'Fail ', err)
      } else {
        log.info('testing remove', 'Pass')
      }
    })
  }
})

// ---

nbLeft = l = 10
fails = false

for (i = 0; i < l; i += 1) {
  fs.readFile('http://perdu.com', function (err, data, response) {
    nbLeft -= 1
    if (err) {
      fails = true
      finishManyGets(err)
    } else {
      finishManyGets(null, data)
    }
  })
}

function finishManyGets (err, data) {
  if (nbLeft === 0) {
    if (fails) {
      log.error('testing many subsequent GET requests', 'Fail', err)
    } else {
      log.info('testing many subsequent GET requests', 'Pass', data/*.toString()*/)
    }
  } else if (err) {
    log.error('testing many subsequent GET requests', 'Fail', err)
  }
}

// ---

readServer = testServer('read', readPort)
fs.readFile('http://localhost:' + readPort
  , retryOptions
  , function (err, data, response) {
    if (err) {
      log.error('testing readFile retries', 'Fail', err)
    } else {
      log.info('testing readFile retries', 'Pass')
    }
    readServer.close()
  })

// ---

writeServer = testServer('write', writePort)
fs.writeFile(filesPath + 'out2.txt', 'http://localhost:' + writePort
  , retryOptions
  , function (err) {
    if (err) {
      log.error('testing writeFile retries', 'Fail', err)
    } else {
      log.info('testing writeFile retries', 'Pass')
    }
    writeServer.close()
  })