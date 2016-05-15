'use strict'
var Event = require('vigour-event')
var triggerBind = require('../trigger/bind')
exports.define = {
  trigger (binds, event) {
    var method = this.__input
    if (method) {
      var ev = new Event(this._parent.key)
      var data
      ev.condition = true
      var t = this.parent.parent.parent
      var emitter = this.parent
      method.call(t, data, function (datax) {
        for (let uid in binds) {
          if (uid !== 'val') {
            let bind = binds[uid]
            triggerBind(emitter, bind, ev, datax)
            ev.trigger()
          }
        }
      }, ev)
    }
  }
}
