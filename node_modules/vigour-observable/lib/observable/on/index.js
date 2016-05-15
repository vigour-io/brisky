'use strict'
var resolve = require('./resolve')
var On = require('./constructor')

exports.properties = {
  on: { val: On, override: '_on' },
  listensOnBase: true, // these things have to become optmized (dont use array use uids)
  listensOnAttach: true, // these things have to become optmized (dont use array use uids)
  overrides: true
}

exports.overrides = On.prototype._properties._overrides

exports.define = {
  on (type, val, key, unique, event, nocontext) {
    if (this.__input === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.on('data', type, val, key, unique, event)
    }
    // ***** PERF FIX *******
    // split the args parser and the internal saves a lot of speed
    // make internal that you call from every function saves above check in many cases!!!
    let override = this.overrides[type]
    if (override) {
      type = override
    }

    let observable = resolve.call(this, type, val, key, event, nocontext)

    observable._on[type].on(val, key, unique, event, nocontext)
    return observable
    // ----------
  },
  once (type, val, key, unique, event) {
    if (this.__input === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.once('data', type, val, key, unique)
    }
    let override = this.overrides[type]
    if (override) {
      type = override
    }
    let observable = resolve.call(this, type, val, key, event)
    observable._on[type].once(val, key, unique, event)
    return observable
  }
}
