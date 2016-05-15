'use strict'
var Base = require('vigour-base')
var Observable = module.exports = new Base({
  inject: [
    require('./constructor'),
    require('./on'),
    require('./emit'),
    require('./off'),
    require('./remove'),
    require('./set'),
    require('./subscribe')
  ],
  ChildConstructor: 'Constructor'
}).Constructor
