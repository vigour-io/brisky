'use strict'

// this is clearly a seperate repo!
var Base = require('vigour-base')
var hash = require('vigour-util/hash')
var isPlainObj = require('vigour-util/is/plainobj')
module.exports = function (observable, event) {
  exports.properties = {
    storage: true
  }

  exports.define = {
    storageKey: {
      get () {
        var key = this.hasOwnProperty('_storageKey') && this._storageKey
        if (!key) {
          let storage = this.storage
          if (storage) {
            if (typeof storage === 'function') {
              key = storage()
            } else if (storage instanceof Base) {
              key = storage.parseValue()
            } else {
              key = storage
            }
          } else {
            key = hash(this.path.join('.'))
          }
          if (!key) {
            return
          }
          this._storageKey = key
        }
        return key
      }
    }
  }

  function getFromStorage (data, event) {
    var stored = global.localStorage.getItem(this.storageKey)
    if (stored) {
      this.set(stored, event)
    }
  }

  exports.on = {
    new: {
      storage: getFromStorage
    },
    data: {
      storage (data, event) {
        if (data === null && this.storageKey) {
          global.localStorage.removeItem(this.storageKey)
          return
        }
        if (!isPlainObj(data)) {
          if (data instanceof Base) {
            data = data.val
          }
          if (typeof data !== 'object') {
            global.localStorage.setItem(this.storageKey, data === false ? '' : data)
          }
        } else {
          getFromStorage.call(observable, void 0, event)
        }
      }
    }
  }
  observable.set(exports, event)
  getFromStorage.call(observable, void 0, event)
}
