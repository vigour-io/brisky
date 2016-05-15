'use strict'
var Base = require('vigour-base')
var Event = require('./events').Data
var proto = Base.prototype
var set = proto.set
var addNewProperty = proto.addNewProperty

module.exports = function (observable) {
  var Observable = observable.Constructor
  observable.define({
    handleReference (val, event, oldVal) {
      var valIsObservable = val instanceof Observable
      if (valIsObservable) {
        this.__input = val.on('data', this, void 0, void 0, event)
        this.emit('reference', oldVal, event)
        // return key or something
      }
      if (oldVal instanceof Observable) {
        // wrong...
        oldVal.off('data', { base: this })
        if (!valIsObservable) {
          this.emit('reference', oldVal, event)
        }
      }
    },
    setValueInternal (val, event) {
      var oldVal = this.__input
      this.__input = val
      this.handleReference(val, event, oldVal)
      this.emit('value', val, event)
      return this
    },
    set (val, event, nocontext, escape) {
      var trigger
      if (event === void 0) {
        trigger = true
        event = new Event()
      }
      var base = set.call(this, val, event, nocontext, escape)
      // maybe something with the g doc fucked up
      if (event) {
        if (base) {
          base.emit('data', val, event)
        }
        if (trigger) {
          event.trigger()
        }
      }
      return base
    },
    addNewProperty (key, val, property, event, escape) {
      var fireParentEvent = !this[key] || (val && val.useVal)
      addNewProperty.call(this, key, val, property, event, escape)
      if (event) {
        this.emit('property', key, event)
      }
      if (fireParentEvent && this[key] instanceof Observable) {
        // can be leading as well!
        this[key].emit('parent', this, event)
      }
    }
  })
}
