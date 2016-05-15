'use strict'
var isPlainObj = require('vigour-util/is/plainobj')
var Base = require('vigour-base')

// *** CANDIDATE FOR PERFORMANCE ***
exports.define = {
  off (val, nocontext) {
    var emitter = this
    var context = emitter._context
    var type = typeof val
    var storageKey, storage
    if (type === 'string' || type === 'number') {
      storageKey = findKey(val, emitter)
      if (!nocontext) {
        emitter = resolveContext(emitter, context, storageKey)
      }
      storage = emitter[storageKey]
      if (storage) {
        storage.removeProperty(storage[val], val, false, true)
      }
    } else {
      findAndRemove(emitter, val, nocontext)
    }
  }
}

// can become a lot faster rly a lot...

function resolveContext (emitter, context, storageKey) {
  // TODO: clean up - try to use internal context resolve more on no
  // use the one from on (resolve)
  // figure out why we cant use resolveContextSet since thats what it is
  if (context) {
    // this is lame stuff! should be in observable in some way...
    let base = emitter.parent.parent
    let type = emitter.key
    let setObj = { on: {} }
    setObj.on[type] = {}
    // base = base.set(setObj) // .on[type]
    emitter = (base.set(setObj) || base)._on[type]
  }
  if (!emitter.hasOwnProperty(storageKey)) {
    emitter.setKey(storageKey, {}, false)
  }
  return emitter
}

function removeFromStorage (storage, val, emitter, field, nocontext) {
  if (storage) {
    var check = val.check
    if (check) {
      storage.each(function (compare, key) {
        if (check(compare)) {
          emitter.off(key, nocontext)
        }
      })
    } else if (field !== void 0) {
      storage.each(function (compare, key) {
        if (compare[field] === val) {
          emitter.off(key, nocontext)
        }
      })
    } else {
      storage.each(function (compare, key) {
        if (compare === val) {
          emitter.off(key, nocontext)
        }
      })
    }
  }
}

function findKey (key, emitter) {
  var storageKey
  if (emitter.fn && emitter.fn[key]) {
    storageKey = 'fn'
  } else if (emitter.base && emitter.base[key]) {
    storageKey = 'base'
  } else if (emitter.attach && emitter.attach[key]) {
    storageKey = 'attach'
  }
  return storageKey
}

function findAndRemove (emitter, val, nocontext) {
  if (isPlainObj(val)) {
    if (val.fn) {
      removeFromStorage(emitter.fn, val.fn, emitter, void 0, true)
    }
    if (val.attach) {
      removeFromStorage(
        emitter.attach,
        val.attach,
        emitter,
        typeof val.attach === 'function' ? 0 : 1,
        true
      )
    }
    if (val.base) {
      removeFromStorage(emitter.base, val.base, emitter, void 0, true)
    }
  } else if (typeof val === 'function') {
    removeFromStorage(emitter.fn, val, emitter, void 0, true)
    removeFromStorage(emitter.attach, val, emitter, 0, true)
  } else if (val instanceof Base) {
    removeFromStorage(emitter.base, val, emitter, void 0, true)
    removeFromStorage(emitter.attach, val, emitter, 1, true)
  } else {
    // console.warn('do not support', val, 'type in find and remove listener')
  }
}
