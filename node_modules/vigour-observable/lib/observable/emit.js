'use strict'
var Event = require('vigour-event')
exports.inject = require('./instances')

exports.define = {
  emit (key, data, event, ignore) {
    if (event === false) {
      return
    }
    let trigger
    if (event === void 0) {
      if (ignore) {
        return
      }
      event = new Event(key)
      trigger = true
    }
    if (!ignore) {
      let on = this._on
      if (on) {
        let override = on._properties._overrides[key]
        if (override) {
          key = override
        }
        let emitter = on[key]
        if (emitter) {
          // emitter lezzgo -- internal?
          // console.log('dafuq', data, key)
          emitter.emitInternal(data, event, this)
        } else {
          // **** Lets see if we actualy need this saves a check allways nice ****
          emitNonSharedInstances(this, key, data, event)
        }
      }
    }
    if (trigger) {
      event.trigger()
    }
  }
}

function emitNonSharedInstances (bind, key, data, event) {
  let instances = bind.getInstances()
  if (instances) {
    let emitter
    for (let i = instances.length - 1; i >= 0; i--) {
      emitter = instances[i].__on[key] // use on to share
      if (emitter) {
        emitter.emitInternal(data, event, instances[i])
      }
    }
  }
}

/*
'use strict'
can also be added there
var isOverwritten = require('./overwrite')
*/
