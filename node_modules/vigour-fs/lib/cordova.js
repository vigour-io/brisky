var cordovaReady = false
var EventEmitter = require('eventemitter3')
var ee = new EventEmitter()

// window.cordova = true

ee.on('error', function (err) {
  throw err // TODO
})

document.addEventListener('deviceready'
  , function () {
    cordovaReady = true
    ee.emit('cordovaReady')
  }
  , false)

module.exports = exports = {}

exports.whenReady = function (cb) {
  if (!cordovaReady) {
    ee.once('cordovaReady', cb)
  } else {
    cb()
  }
}

exports.getConnectionType = function (cb) {
  exports.whenReady(function () {
    if (!navigator ||
      !navigator.connection ||
      !navigator.connection.type) {
      cb(new Error("`navigator.connection.type` doesn't exist. Make sure the network-information plugin is installed."))
    } else {
      cb(null, navigator.connection.type)
    }
  })
}

exports.getPreferredLanguage = function (cb) {
  exports.whenReady(function () {
    if (!navigator ||
      !navigator.globalization ||
      !navigator.globalization.getPreferredLanguage) {
      cb(new Error("`navigator.globalization.getPreferredLanguage` doesn't exist. Make sure the globalization plugin is installed."))
    } else {
      navigator.globalization.getPreferredLanguage(function (lang) {
        cb(null, lang.value)
      }
        , function (err) {
          cb(err)
        })
    }
  })
}

exports.getLocaleName = function (cb) {
  exports.whenReady(function () {
    if (!navigator ||
      !navigator.globalization ||
      !navigator.globalization.getLocaleName) {
      cb(new Error("`navigator.globalization.getLocaleName` doesn't exist. Make sure the globalization plugin is installed."))
    } else {
      navigator.globalization.getLocaleName(function (locale) {
        cb(null, locale.value)
      }
        , function (err) {
          cb(err)
        })
    }
  })
}
