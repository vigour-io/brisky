'use strict'
var Base = require('vigour-base')
var Storage = new Base({
  noContext: true,
  define: {
    removeProperty: removeProperty,
    val: {
      value: void 0,
      writable: true
    }
  }
}).Constructor

var attach = new Storage({
  define: {
    removeProperty: function (property, key, blockRemove) {
      // var base = property && property[1]
      removeProperty.call(this, property, key, blockRemove)
    }
  }
})

var baseStorage = new Storage({
  define: {
    removeProperty: function (property, key, blockRemove) {
      cleanListens(property, 'listensOnBase', this, true)
      removeProperty.call(this, property, key, blockRemove)
    }
  }
})

function cleanListens (property, field, storage, base) {
  if (property instanceof Base) {
    let emitter = storage._parent
    removeFromListens(property[field], emitter, base)
  }
}

function removeFromListens (listens, emitter, base) {
  // need event!
  if (listens) {
    for (let i in listens) {
      if (i[0] !== '_') {
        if (listens[i] === emitter) {
          delete listens[i]
          if (base && emitter._parent && listens._parent.__input === emitter._parent._parent) {
            listens._parent.__input = void 0
          }
        }
      }
    }
  }
}

function removeProperty (property, key, blockRemove) {
  if (this[key] !== null && key !== '_Constructor') {
    let thisKey = this.key
    if (this._parent.onRemoveProperty) {
      this._parent.onRemoveProperty(this[key], key)
    }
    this[key] = null
    if (key[0] !== '_' && isEmpty(this) && this._parent && !blockRemove) {
      this._parent.removeProperty(this, thisKey, false, true)
    }
  }
}

exports.ChildConstructor = Storage

exports.properties = {
  attach: attach,
  base: baseStorage
}

function isEmpty (val) {
  for (var key in val) {
    if (!val._properties[key] && val[key] !== null) {
      return false
    }
  }
  return true
}