'use strict'
var Base = require('vigour-base')
var remove = Base.prototype.remove

module.exports = new Base({
  key: 'condition',
  ignoreInput: true,
  properties: {
    inProgress: true
  },
  inject: [
    require('./trigger')
  ],
  define: {
    generateConstructor () {
      return function (val, event, parent, key) {
        Base.apply(this, arguments)
      }
    },
    remove () {
      return remove.apply(this, arguments)
    }
  }
}).Constructor
