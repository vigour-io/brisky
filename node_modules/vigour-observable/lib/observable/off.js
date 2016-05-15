'use strict'
var Emitter = require('../emitter')

// when not pasing val should remove all listeners?
// we need an option to remove all listeners
exports.define = {
  off: function (type, val, event, nocontext) {
    // off without arguments should remove the total emitter
    if (typeof type === 'string') {
      var override = this.overrides[type]
      if (override) {
        type = override
      }
      if (!val) {
        val = 'val'
      }
      var emitter = this._on && this._on[type]
      if (emitter) {
        emitter.off(val, void 0, nocontext)
      }
    } else {
      findAndRemove(this, type, void 0, val, nocontext)
    }
  }
}

function findAndRemove (base, val, emitter, key, nocontext) {
  var key$
  if (!emitter) {
    // TODO clean this up
    if (key) {
      for (key$ in base._on) {
        if (base._on[key$] instanceof Emitter && key$[0] !== '_') { //&& key$[0] !== '_'
          base._on[key$].off(key, nocontext)
        }
      }
    } else {
      for (key$ in base._on) {
        if (base._on[key$] instanceof Emitter) {
          findAndRemove(base, val, base._on[key$], key, nocontext)
        }
      }
    }
  } else {
    emitter.off(val, nocontext)
  }
}
