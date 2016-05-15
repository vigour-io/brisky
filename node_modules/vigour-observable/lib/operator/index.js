'use strict'
var Observable = require('../observable')
var obs = new Observable({
  properties: {
    _operator: true,
    operator: '_operator'
  },
  bind () {
    let parent = this.parent
    return parent && parent.getBind()
  },
  on: {
    data (data, event) {
      if (this.parent) {
        this.parent.emit('data', data, event)
      }
    }
  }
})

module.exports = obs.Constructor
obs.inject(require('./val'))
