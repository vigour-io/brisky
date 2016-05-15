'use strict'
var Emitter = require('./index.js')
module.exports = new Emitter({
  define: {
    getData (event, bind) {
      return bind.__input // also check for removes etc
    },
    emitInternal (data, event, bind) {
      this.emitting && event.push(this, bind, data)
    }
  }
}).Constructor
