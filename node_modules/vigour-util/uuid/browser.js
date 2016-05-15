'use strict'
var hash = require('../hash')
var rand = ~~(Math.random() * 10000)
var stamp = Date.now()

exports.val = hash(
  'b-' +
  stamp +
  '-' +
  rand +
  '-' + window.navigator.userAgent +
  '-' + window.navigator.userLanguage +
  window.navigator.language
)
