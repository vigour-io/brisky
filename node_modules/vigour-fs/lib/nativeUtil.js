var config
var fsReady = false
var fsRequested = false
var cordova = require('./cordova')
var EventEmitter = require('eventemitter3')
var ee = new EventEmitter()

ee.on('error', function (err) {
  ee.emit('fsReady', err)
})

module.exports = exports = {
  whenFsReady: function (cb) {
    cordova.whenReady(function () {
      if (!fsReady) {
        ee.once('fsReady', cb)
        if (!fsRequested) {
          requestFS()
        }
      } else {
        cb()
      }
    })
  }
}

function requestFS () {
  var error
  var time
  var ignoreCallback = false
  var ignoreTimeout = false
  var delay = 5000
  fsRequested = true
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem
  if (window.requestFileSystem) {
    time = window.setTimeout(function () {
      if (!ignoreTimeout) {
        ignoreCallback = true
        fsRequested = false
        ee.emit('error', new Error("window.requestFileSystem doesn't call either of its callbacks withing " + delay + ' seconds.'))
      }
    }, delay)
    config = require('../config')
    window.requestFileSystem(config.fsType
      , config.fsSize
      , function (filesystem) {
        if (!ignoreCallback) {
          window.fs = filesystem
          fsReady = true
          fsRequested = false
          ignoreTimeout = true
          window.clearTimeout(time)
          ee.emit('fsReady', null)
        }
      }
      , function (err) {
        if (!ignoreCallback) {
          var error = err
          fsRequested = false
          error.message = 'Error requesting file system: ' + error.message
          error.requestedFsType = config.fsType
          error.requestedFsSize = config.fsSize
          ignoreTimeout = true
          window.clearTimeout(time)
          ee.emit('error', error)
        }
      })
  } else {
    error = new Error('No file system ((window.requestFileSystem || window.webkitRequestFileSystem) == false')
    ee.emit('error', error)
  }
}
