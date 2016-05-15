'use strict'
module.exports = function (base) {
  var Base = base.Constructor
  var _addProperty = base.addNewProperty
  var _remove = base.remove
  var _removeUpdateParent = base.removeUpdateParent
  var _removeProperty = base.removeProperty
  // var _contextRemove = base.contextRemove
  // var _emitRemove = base.emitRemove
  var isPlain = require('vigour-util/is/plainobj')

  exports.properties = {
    _keylists: { val: [ '_keys' ] }, // will be replaced with the keytypes
    keyTypes (val, event) {
      if (isPlain(val)) {

      } else {
        throw new Error('pass a plain object to keyTypes path: ' + this._path.join('.'))
      }
    }
  }

  exports.define = {
    keysCheck (val, key) {
      return val[key] instanceof Base
    },
    removeUpdateParent () {
      if (this._parent) {
        this._parent.clearKeysCache()
      }
      return _removeUpdateParent.apply(this, arguments)
    },
    keys (field, check) {
      if (!check) {
        check = this.keysCheck
      }
      if (!field) {
        field = '_keys'
      }
      var keys = this[field]
      if (!keys && keys !== false || !this.hasOwnProperty(field)) {
        keys = this[field] = []
        let ordered
        let target
        for (let key in this) {
          target = this[key]
          if (key[0] !== '_' && ((target = this[key]), target !== null) && check(this, key)) {
            if (!ordered && target.order) {
              ordered = true
            }
            keys.push(key)
          }
        }
        if (ordered) {
          // this is ofcourse rly rly slow fix this later and good
          // have to replace soon
          keys.sort(this.sort.bind(this))
        } else if (!keys[0]) {
          keys = this[field] = false
        }
      }
      return keys
    },
    sort (a, b) {
      a = this[a].order || 0
      b = this[b].order || 0
      a = a.val || a || 0
      b = b.val || b || 0
      return a === b ? 0 : a < b ? -1 : 1
    },
    remove () {
      if (this.parent) {
        this.parent.clearKeysCache()
      }
      return _remove.apply(this, arguments)
    },
    removeProperty () {
      this.clearKeysCache()
      var ret = _removeProperty.apply(this, arguments)
      return ret
    },
    addNewProperty () {
      var ret = _addProperty.apply(this, arguments)
      this.clearKeysCache()
      return ret
    },
    clearKeysCache () {
      for (var i = 0, len = this._keylists.length; i < len; i++) {
        var keylist = this._keylists[i]
        if (this[keylist] !== void 0) {
          this[keylist] = null
        }
      }
    }
  }
  base.set(exports)
}
