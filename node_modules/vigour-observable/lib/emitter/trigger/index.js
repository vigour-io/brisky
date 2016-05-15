'use strict'
var execattach = require('./attach')
var triggerBind = require('./bind')

exports.define = {
  isExecutable (property, key, base, stamp) {
    return !base._properties[key]
  },
  execInternal (bind, event, data) {
    var emitter = this
    var stamp = event.stamp
    if (!bind._context && emitter.base) {
      // console.log('yo!')
      // *** CLEAN UP MAYBE GET SPEED BY JUST DOING THIS IN FUNCTION MAKE NICER ANYWAYS ***
      // maybe remove the behaviour to block context / instances updates
      let type = emitter.key
      let on = (!bind.__on && bind._on) || bind.hasOwnProperty('__on') && bind.__on
      let _type = '_' + type // this is fucked slow
      if (on && !on[_type] || on.hasOwnProperty(_type)) {
        emitter.base.each(function (property) {
          // console.log('here?')
          // *** CANDITATE FOR MURDER! ***
          // property.clearContextUp()
          // no context! is that it? no...
          if (bind === property.__input) {
            // ok need this here for sure
            property.clearContextUp() // 1000 double check

            // property.emit('data', data, event)
            triggerBind(property._on[type], property, event, data)
          }
        }, function (property, key, base, stamp) {
          // console.log('go listener!')
          // maybe we dont need to do this like this -- reuse own emitter if not -- may need to fire for contexts/instance etc
          return !base._properties[key] &&
            // base.hasOwnProperty(key) &&
            property._on &&
            property._on[type]
            // property.__input === bind
        }, stamp)
      }
    }
    // *** CANDITATE FOR MURDER! ***
    var original = bind
    bind = bind.getBind()

    // console.error('yo going to update some contexts right hur', bind && bind.path)

    if (bind) {
      if (emitter.fn) {
        emitter.fn.each(function (property, key) {
          property.call(bind, data, event, original)
        }, emitter.isExecutable, stamp)
      }
      if (emitter.attach) {
        emitter.attach.each(function (property) {
          execattach(property, bind, event, emitter, data)
        }, emitter.isExecutable, stamp)
      }
    }
  },
  trigger (binds, event) {
    if (binds) {
      if (!this.condition) {
        for (let uid in binds) {
          if (uid !== 'val') {
            let bind = binds[uid]
            triggerBind(this, bind, event)
          }
        }
      } else {
        this.condition.trigger(binds, event)
      }
    }
  }
}
