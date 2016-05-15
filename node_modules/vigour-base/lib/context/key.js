'use strict'
exports.define = {
  key: {
    get () {
      return (this._context && this._contextKey) || this._key
    },
    set (val) {
      this._key = val
    }
  }
}

exports.properties = {
  _contextKey: true
}
