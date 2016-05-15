'use strict'
var Event = require('vigour-event')
exports.define = {
  emit (data, event, bind) {
    if (event === false) {
      return
    }
    let trigger
    if (event === void 0) {
      event = new Event(this.key)
      trigger = true
    }
    // global.uids[bind.uid] = this
    this.emitInternal(data, event, bind)
    if (trigger) {
      event.trigger()
    }
  },
  emitInternal (data, event, bind) {
    if (!event || !event.push) {
      throw new Error('no event passed to emitInternal "' + this.path.join('.') + '"')
    }
    this.storeData(data, event, bind)
    this.emitting && event.push(this, bind, data)
  }
}
