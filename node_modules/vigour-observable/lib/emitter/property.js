'use strict'
var Emitter = require('./index.js')
var emitInternal = Emitter.prototype.emitInternal
module.exports = new Emitter({
  define: {
    emitInternal (data, event, bind) {
      // data system how to make this without impact...
      // if (data === void 0) {
      //   console.error('WTF WTF WTF prob from subscription -- may need to say all props are added? something weird like that')
      // }
      var myData = this.getData(event, bind)
      if (!myData) {
        myData = { added: [], removed: [] }
      }
      // console.warn(data, bind.path, event.stamp)
      if (data) {
        if (bind[data] && bind[data].__input !== null) {
          myData.added.push(data)
        } else {
          myData.removed.push(data)
        }
      }
      return emitInternal.call(this, myData, event, bind)
    }
  }
}).Constructor
