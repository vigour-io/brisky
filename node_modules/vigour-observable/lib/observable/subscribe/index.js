'use strict'

var ref = require('vigour-util/get/reference')
var Event = require('vigour-event')

exports.inject = require('./retrieve')

// optmize and CLEAN this also needs tests
exports.define = {
  subscribe (path, type, val, key, fire, event, nocontext) {
    if (val instanceof Array) {
      if (val[1] && val[1].__input === null) {
        console.log('wrong: trying to set with removed client!')
      }
    }
    // nocontext = true
    // this.clearContext()
    // console.log('yo subs!', path)
    if (!path) {
      // console.warn('no path passed in subscribe', type, key, fire, event)
      return
    }
    let id = this.uid
    if (key) {
      id += '.' + key
    }
    let pathType = typeof path
    if (path === true) {
      path = [] // make faster
    } else if (pathType === 'string') {
      id += path
      path = path.split('.')
    } else if (pathType === 'number') {
      id += path
      path = [path]
    } else {
      id += path.join('.')
    }
    let index = 0
    let length = path.length
    // unsubs will not work now

    //  on (type, val, key, unique, event, nocontext) {

    this.on('remove', function () {
      unsubscribe(this, path, index, length, id, nocontext)
    }, id, void 0, event, nocontext)

    return subscribe(this, path, index, length, type, val, id, fire, this, event, nocontext)
  },

  // test and make better -- the uid is crap now
  unsubscribe (path, key, nocontext) {
    let id = this.uid
    if (key) {
      id += '.' + key
    }
    // make shared shit
    let pathType = typeof path
    if (path === true) {
      path = [] // make faster
    } else if (pathType === 'string') {
      id += path
      path = path.split('.')
    } else if (pathType === 'number') {
      id += path
      path = [path]
    } else {
      id += path.join('.')
    }

    let index = 0
    let length = path.length
    return unsubscribe(this, path, index, length, id, nocontext)
  }
}

// subscriptions have to take care of references
// we have to add walking over the refs here
function subscribe (obs, path, index, length, type, val, id, fire, origin, event, nocontext) {
  if (index === length) {
    // TODO added this to subscribe to key => this is probably not the best way to catch this
    if (obs.on) {
      obs.on('remove', function () {
        // null
        subscribe(origin, path, 0, length, type, val, id, false, origin, event)
      }, id, true, event, nocontext)
      obs.on(type, val, id, true, event, nocontext)
    }
    if (fire) {
      // **TODO** SUPER DIRTY
      // need to have some godamn arguments
      if (event === void 0) {
        var trigger = true
        event = new Event('data') // wrong
      }

      if (typeof val === 'function') {
        val.call(obs, obs.__input, event)
      } else {
        // weird gaurd
        if (val && val[0]) {
          val[0].call(obs, type === 'data' ? obs.__input : void 0, event, val[1])
        }
      }

      if (trigger) {
        event.trigger()
      }
    }
    return obs
  } else {
    let key = path[index]
    let property = obs[key]
    let result

    if (property && property.__input !== null) {
      result = subscribe(property, path, index + 1, length, type, val, id, fire, origin, event, nocontext)
    } else {
      let listenerType = key === 'parent' ? key : 'property'
      let listener = function (data, event) {
        let property = obs[key]
        if (property) {
          obs.off(listenerType, id, void 0, true)
          subscribe(property, path, index + 1, length, type, val, id, true, origin, event, nocontext)
        }
      }
      obs.on(listenerType, listener, id, true, event, nocontext)
    }

    // if sub is not fulfilled look in the reference
    if (!result) {
      let reference = ref(obs)
      if (reference) {
        subscribe(reference, path, index, length, type, val, id, fire, origin, event, nocontext)
      }
    }
  }
}

function unsubscribe (obs, path, index, length, id, nocontext, cnt) {
  //  off: function (type, val, event, nocontext) {
  if (!cnt) {
    // console.log('unsubscribe:', path, index)
    // console.log('\nloop starts')
    cnt = 1
  }
  // console.log('unsubscribe:', path, index)
  if (cnt > 10) {
    console.log('ERROR unsubscribe loop > 10')
    cnt = 0
    return
  }
  // WAY WAY WAY WAY TOOOOO MANY LISTENERS
  // unique?
  obs.off(void 0, id, void 0, true)
  let key = path[index]
  let property = obs[key]
  if (property) {
    unsubscribe(property, path, index + 1, length, id, nocontext, ++cnt)
  }
  let reference = ref(obs)
  if (reference) {
    unsubscribe(reference, path, index, length, id, nocontext, ++cnt)
  }
}
