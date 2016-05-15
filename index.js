'use strict'
module.exports = require('brisky-core')

module.exports.prototype.inject(
  require('brisky-events'),
  require('brisky-props'),
  require('brisky-class'),
  require('brisky-focus'),
  require('brisky-style')
)
