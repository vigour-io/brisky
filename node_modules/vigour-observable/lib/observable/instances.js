'use strict'

exports.properties = {
  trackInstances: true
}

exports.define = {
  getInstances () {
    if (this.hasOwnProperty('_instances')) {
      return this._instances
    }
  },
  addToInstances (event) {
    var proto = Object.getPrototypeOf(this)
    if (!proto.hasOwnProperty('_instances')) {
      proto._instances = []
    }
    // double check where this is used -- use a for in so the hub can use keys
    proto._instances.push(this)
  },
  removeFromInstances (event) {
    var proto = Object.getPrototypeOf(this)
    var instances = proto.getInstances()
    // proto instances
    if (instances) {
      let length = instances.length
      for (let i = 0; i < length; i++) {
        if (instances[i] === this) {
          // removes itself from instances
          instances.splice(i, 1)
          break
        }
      }
    }
    // own instances
    instances = this.getInstances()
    if (instances) {
      let length = instances.length
      for (let i = 0; i < length; i++) {
        // remove all own instance when removing instances
        // same here if remove cant do events dont handle them!
        instances[i].remove(false) // redo dit ff nice zou niet moeten emitter
        i--
        length--
      }
    }
  }
}
