'use strict'
var Base = require('vigour-base')
var isPlainObj = require('vigour-util/is/plainobj')
var isNumberLike = require('vigour-util/is/numberlike')
var shared = require('./shared')
var generateId = shared.generateId
var ListensOn = require('./listens')
var ListensOnattach = ListensOn.ListensOnattach
var ListensOnBase = ListensOn.ListensOnBase
// var removeKeyFromOtherStores = shared.removeKeyFromOtherStores
// next thing to resturcture and clean can become a lot nicer
exports.define = {
  on (val, key, unique, event, once, nocontext) {
    var id
    if (!key) {
      key = generateId(this, val)
    }
    // find key in all stores
    if (typeof val === 'function') {
      add(this, 'fn', val, key, unique, event)
    } else if (val instanceof Base) {
      if (!add(this, 'base', val, key, unique || true, event)) {
        if (!val.listensOnBase) {
          val.setKeyInternal('listensOnBase', new ListensOnBase(void 0, void 0, val), false)
        } else if (!val.hasOwnProperty('listensOnBase')) {
          val.setKeyInternal('listensOnBase', new val.listensOnBase.Constructor(void 0, void 0, val), false)
        }
        let listensOnBase = val.listensOnBase
        id = generateId(listensOnBase)
        listensOnBase[id] = this
      }
    } else if (val instanceof Array) {
      if (!add(this, 'attach', val, key, unique, event)) {
        if (val.length > 2) {
          val[2] = val.slice(1)
          val = val.slice(0, 2)
        }
        let passedOnBased = val[1]
        if (passedOnBased instanceof Base) {
          if (!passedOnBased.listensOnAttach) {
            passedOnBased
              .setKeyInternal('listensOnAttach', new ListensOnattach(void 0, void 0, passedOnBased), false)
          } else if (!passedOnBased.hasOwnProperty('listensOnAttach')) {
            passedOnBased
              .setKeyInternal('listensOnAttach', new passedOnBased.listensOnAttach.Constructor(void 0, void 0, passedOnBased), false)
          }
          let listensOnAttach = passedOnBased.listensOnAttach
          id = generateId(listensOnAttach)
          listensOnAttach[id] = this
        }
      }
    } else {
      // console.error(key, val)
      // not used functionality remove!
      // add(this, 'setListeners', val, key, unique, event)
    }
  },
  set (val, event, nocontext) {
    if (!val) {
      return this
    } else if (isPlainObj(val) && !(val instanceof Array)) {
      set(this, val, event, nocontext)
    } else {
      this.on(val, 'val', void 0, event, void 0, nocontext)
    }
    return this
  }
}

function set (emitter, val, event, nocontext) {
  let props = emitter._properties
  for (let key in val) {
    if (props[key]) {
      props[key].call(emitter, val[key], event, nocontext, key)
    } else {
      if (!emitter._id && isNumberLike(key)) {
        emitter._id = Number(key)
      }
      emitter.on(val[key], key, void 0, event, void 0, nocontext)
    }
  }
}

function parseUnique (emitterType, val, emitter, key, type, unique) {
  var isFn = typeof unique === 'function'
  var stop
  if (isFn) {
    emitterType.each(function (listener) {
      if (!unique.call(emitter, listener, val)) {
        return (stop = true)
      }
    })
  } else {
    if (type === 'attach' && unique === true) {
      // way to slow of course... needs to use uids for attaches
      emitterType.each(function (listener) {
        if (listener[1] === val[1]) {
          return (stop = true)
        }
      })
    } if (type === 'base' && typeof key !== 'string') {
      stop = emitterType[key]
    } else {
      emitterType.each(function (listener) {
        if (listener === val) {
          return (stop = true)
        }
      })
    }
  }
  if (stop) {
    return true
  }
}

function resolve (emitter, type, key, log) {
  if (!emitter.hasOwnProperty(type)) {
    emitter.setKey(type, {}, false)
  }
  if (emitter[type][key]) {
    emitter[type].removeProperty(emitter[type][key], key, true)
  }
}

function addInternal (emitter, type, key, val) {
  if (emitter[type]) {
    emitter[type][key] = val
  } else {
    // console.error('yo internal add listener WRONG emitter[type] does not exist', arguments)
  }
}

function add (emitter, type, val, key, unique, event) {
  var emitterType = emitter[type]
  if (!emitterType) {
    if (event) {
      event._on.close(event, function () {
        if (!emitter[type]) {
          emitter.setKey(type, void 0, false)
        } else {
          resolve(emitter, type, key)
        }
        emitter.emitting = true
        addInternal(emitter, type, key, val)
      })
      return
    } else {
      emitter.setKey(type, void 0, false)
      emitter.emitting = true
      addInternal(emitter, type, key, val)
      return
    }
  } else if (unique) {
    if (parseUnique(emitterType, val, emitter, key, type, unique)) {
      return true
    }
  }
  // **** OTHER STORE REMOVAL DISABLED FOR NOW!!! ****
  // removeKeyFromOtherStores make fast alternative?
  // add thing in off where you can use this but nowhere else its to confuse
  // then its just type[id] same for the user keep things simple!
  if (event) {
    resolve(emitter, type, key)
    event._on.close(event, function () {
      // resolve(emitter, type, key) may need to do again everything can be removed
      emitter.emitting = true
      addInternal(emitter, type, key, val)
    })
  } else {
    resolve(emitter, type, key)
    emitter.emitting = true
    addInternal(emitter, type, key, val)
  }
}
