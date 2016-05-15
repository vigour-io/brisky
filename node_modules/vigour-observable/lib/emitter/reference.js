'use strict'
var Emitter = require('./index.js')
var emitInternal = Emitter.prototype.emitInternal
module.exports = new Emitter({
  define: {
    emitInternal (data, event, bind) {
      var dataStorage = this.__data = data
      var ret = emitInternal.call(this, dataStorage, event, bind)
      return ret
    }
  }
}).Constructor
