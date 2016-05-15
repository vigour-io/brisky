'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')

module.exports = new Base({
  define: {
    ChildConstructor: Emitter,
    generateConstructor: function () {
      return function On (val, event, parent, key) {
        if (parent) {
          parent.trackInstances = true
        }
        return Base.apply(this, arguments)
      }
    }
  },
  properties: {
    property: require('../../emitter/property'),
    reference: require('../../emitter/reference'),
    error: require('../../emitter/error'),
    value: new Emitter(),
    remove: {
      val: new Emitter(),
      override: 'removeEmitter'
    },
    parent: {
      val: new Emitter({
        emitInstances: false,
        emitContexts: false
      }),
      override: 'parentEmitter'
    },
    new: new Emitter({
      emitInstances: false,
      emitContexts: false
    }),
    data: require('../../emitter/data')
  }
}).Constructor
