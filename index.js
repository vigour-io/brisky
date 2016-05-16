'use strict'
module.exports = require('brisky-core')

module.exports.prototype.inject(
  require('brisky-events/rightclick'),
  require('brisky-events/basic'),
  require('brisky-events/force'),
  require('brisky-events/hover'),
  require('brisky-events/drag'),
  require('brisky-events/key'),
  require('brisky-props'),
  require('brisky-class'),
  require('brisky-focus'),
  require('brisky-style')
)
