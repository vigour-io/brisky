'use strict'
var Emitter = require('./')
var emitInternal = Emitter.prototype.emitInternal

module.exports = new Emitter({
  emitInstances: false,
  emitContexts: false,
  define: {
    emitInternal: function (error, event, bind) {
      var data = this.getData(event, bind)
      if (
        (!error && !data && (error = 'emit')) ||
        typeof error === 'string'
      ) {
        let path = this.path
        if (path.length > 2) {
          path = path.slice(0, -2)
        }
        error = new Error(path.join('.') + ' ' + error)
      }
      if (data !== error) {
        if (!data) {
          data = error
        } else {
          if (!(data instanceof Array)) {
            data = []
          }
          data.push(error)
        }
      }
      return emitInternal.call(this, data, event, bind)
    }
  }
}).Constructor
