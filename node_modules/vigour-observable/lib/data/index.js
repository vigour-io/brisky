'use strict'
var hash = require('vigour-util/hash')
module.exports = function (base) {
  var _on = base.on
  var _setKeyInternal = base.setKeyInternal
  base.set({
    properties: {
      _lstamp: true,
      _hash: true,
      cachedSyncPath: true
    },
    define: {
      on (type, val) {
        if (val && val.$map && this.$) {
          this.$(val.$map(), void 0, false, val)
        }
        return _on.apply(this, arguments)
      },
      hash: {
        get () {
          return !this._hash ? (this._hash = hash(this.syncPath.join('.'))) : this._hash
        }
      },
      syncPath: {
        get () {
          var parent = this
          var path = []
          if (this.cachedSyncPath) {
            return this.cachedSyncPath
          }
          while (parent && parent.key && !parent.adapter) {
            path.unshift(parent.key)
            parent = parent._parent
          }
          this.cachedSyncPath = path
          return path
        }
      },
      setKeyInternal (key, val, property, event, nocontext, escape) {
        if (
          typeof val === 'object' &&
          val !== null && val.val &&
          val.val.reference &&
          val.val.reference instanceof Array
        ) {
          val.val.reference.unshift('$')
          val = val.val.reference
        }
        if (val instanceof Array && val[0] === '$' || val.val && val.val instanceof Array) {
          if (val.val) {
            val.val = getRef(this, val.val)
          } else {
            val = getRef(this, val)
          }
        }
        return _setKeyInternal.call(this, key, val, property, event, nocontext, escape)
      }
    },
    on: {
      data: {
        lstamp (data, event) {
          // so this does not fire for everyone...
          var parent = this
          while (parent && parent._lstamp !== event.stamp) {
            parent._lstamp = event.stamp
            if (parent._on.data.base && parent !== this) {
              parent.emit('data', data, event) // may be too heavy
            }
            parent = parent.parent
          }
        }
      }
    }
  })
  base.set({
    properties: {
      order: new base.Constructor({
        on: {
          data: {
            order () {
              this.parent.parent._keys = null
            }
          }
        }
      })
    }
  })
}

function getRef (obs, val) {
  var hub = obs.getRoot()
  var comparep = obs.syncPath
  var useParent
  val.shift()
  var target = hub
  for (let i = 0, length = val.length; i < length; i++) {
    let segment = val[i]
    if (!target[segment] || useParent) {
      if (comparep[i] == val[i] && isParent(comparep, val, i)) { //eslint-disable-line
        useParent = true
      } else {
        val = val.slice(i)
        if (useParent) {
          let l = (comparep.length - 1) - i
          let p = obs
          while (l > -1) {
            p = p._contextLevel === 1 ? p._context : p._parent
            l--
          }
          return p.get(val, {})
        } else {
          return target.get(val, {})
        }
      }
    } else {
      target = target[segment]
    }
  }
  return target
}

function isParent (arr, val, len) {
  for (var i = 0; i < len; i++) {
    if (arr[i] != val[i]) { //eslint-disable-line
      return
    }
  }
  return true
}
