'use strict'
var Base = require('../')
var isPlainObj = require('vigour-util/is/plainobj')
var define = Object.defineProperty
var injectBase = require('./base')
/**
 * @function inject
 * inject modules into bases usesfull pattern if you inject modules multiple times
 * @param {*...} val repeats for each argument
 * function, calls and do special stuff on inject
 * object, calls .set on base
 * base (not supported yet) acts as a mixin
 * @todo add base mixin support
 * @memberOf Base#
 * @return {Base} returns new instance of property Constructor
 */
exports.inject = function () {
  var length = arguments.length
  var event
  var eventtarget = arguments[length - 1]
  if (
    !eventtarget ||
    eventtarget.push &&
    eventtarget.trigger &&
    eventtarget.stamp
  ) {
    event = arguments[length - 1]
    length = length - 1
  }
  for (let i = 0; i < length; i++) {
    inject.call(this, arguments[i], event)
  }
  return this
}

function inject (val, event) {
  var injected = val._injected
  var isFn

  if (!val.hasOwnProperty('_injected')) {
    // does not get called in set (since non-enum)
    define(val, '_injected', {
      configurable: true,
      value: []
    })
    injected = val._injected
  } else {
    for (let i = 0, length = injected.length; i < length; i++) {
      let target = injected[i]
      if (this === target ||
        (target.hasOwnProperty('_Constructor') &&
        target._Constructor &&
        (this instanceof target._Constructor)
        )
      ) {
        // allready injected
        return
      }
    }
  }
  injected.push(this)

  isFn = typeof val === 'function'

  if (isFn && val.prototype instanceof Base) {
    val = val.prototype
    isFn = null
  }

  if (isFn) {
    // maybe check if its a constructor then make a new combination?
    val(this, event)
  } else if (isPlainObj(val)) {
    if (this instanceof Base || this === Base.prototype) {
      // make your own event something like inject -- then correct it for new?
      this.set(val, event)
    } else {
      if (this.define) {
        this.define(val)
      } else {
        for (let key in val) {
          this[key] = val
        }
      }
    }
  } else if (val instanceof Base) {
    injectBase.call(this, val, event)
  }
}
