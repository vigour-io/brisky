'use strict'
/**
 * @namespace Event
 * Constructor of Event
 * Events are used to bundle emitters and handle updates correctly
 * @param {base} [origin] origin base of event
 * @param {string} [type] type of event e.g "data"
 */
var cnt = 0
var Event = module.exports = function Event (type, stamp) {
  this.stamp = stamp || (cnt++)
  if (type) {
    this.type = type
  }
}

var event = Event.prototype

/**
 * @function define
 * @memberOf Event#
 */
Object.defineProperty(event, 'define', {
  value: require('vigour-util/define'),
  configurable: true
})

event.define({
  on (type, val) {
    return this._on[type](this, val)
  },
  // *** TODO *** NEED A SYSTEM FOR PROPERTIES __ THIS IS A STRANGE SPOT
  properties: {
    value: {
      stamp: true,
      prevent: true,
      _triggered: true,
      type: true,
      _onClose: true,
      data: true,
      upstream: true,
      condition: true,
      client: true
    }
  },
  _on: {
    value: {
      close (event, val) {
        var onClose = event._onClose
        if (!onClose) {
          event._onClose = onClose = []
        }
        onClose.push(val)
        return event
      }
    }
  },
  /**
   * @function push
   * push emitters to the event queue
   * @param {emitter} [emitter] push an emitter to the event queue
   * @memberOf Event#
   * @returns {event}
   * @todo define secondary here and not in the loop
   */
  push (emitter, bind) {
    var target = this
    if (this._triggered) {
      if (this._triggered.stamp) {
        this._triggered.push(emitter, bind)
      } else {
        target = this._triggered = new Event(this.type)
        target.upstream = this.upstream
        // target.data = this.data
        target.stamp = this.stamp
      }
    }
    let uid = emitter.uid
    if (!target[uid]) {
      target[uid] = {
        val: emitter,
        [bind.uid]: bind
      }
    } else if (!target[uid][bind.uid]) {
      target[uid][bind.uid] = bind
    }
  },
  trigger: require('./trigger.js'),
  /**
   * @function remove
   * clears event, removes props, removes references
   * @memberOf Event#
   */
  remove () { // rename this to close
    if (this._triggered && this._triggered.trigger) {
      this._triggered.trigger()
    }
    var onclose = this._onClose
    if (onclose) {
      let len = onclose.length
      for (let i = 0; i < len; i++) {
        onclose[i](this)
      }
      this._onClose = null
    }
    // this.origin = null
    // this.resolving = null
    // this.inherited = null
    // this.removed = true
  }
})
