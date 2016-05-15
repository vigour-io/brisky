'use strict'
var Base = require('vigour-base')

exports.generateId = function (base, val) {
  if (val instanceof Base) {
    return val.uid
  }
  return (base._id ? (++base._id) : (base._id = 1))
}

exports.removeKeyFromOtherStores = function (key, type, emitter) {
  // clean this up later
  var types = {
    fn: true,
    base: true,
    attach: true
  }

  for (let type$ in types) {
    if (type$ !== type) {
      if (emitter[type$] && emitter[type$][key]) {
        emitter[type$].removeProperty(emitter[type$][key], key)
      }
    }
  }
}
