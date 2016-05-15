'use strict'

var Promise = require('bluebird')
Promise.config({ cancellation: true })

exports.define = {
  is (val, callback, event) {
    var type = typeof val
    var compare
    var promise
    var parsed = this.val
    var _this = this

    if (type === 'function') {
      compare = val
    } else {
      compare = function (compare) {
        return compare == val //eslint-disable-line
      }
    }

    if (!callback) {
      let cancel = function () {
        promise.cancel()
      }
      promise = new Promise(function (resolve, reject, onCancel) {
        onCancel(function () {
          _this.off('data', is)
          _this.off('remove', cancel)
        })
        // reject
        callback = function (data, event) {
          _this.off('remove', cancel)
          resolve(this, data, event)
        }
      })
    }

    if (compare.call(this, parsed, void 0, event)) {
      if (callback) {
        callback.call(this, parsed, event)
      }
    } else {
      this.on('data', is)
    }

    function is (data, event) {
      // context problems in clear
      if (compare.call(this, this.val, data, event)) {
        // let stored
        // if (_this._context) {
        //   stored = _this.storeContextChain()
        // }
        // _this.clearContext()
        _this.off('data', is)
        callback.call(this, data, event)
        // if (stored) {
        //   _this.setContextChain(stored)
        // }
      }
    }
    return promise || this
  }
}
