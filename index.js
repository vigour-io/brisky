'use strict'
module.exports = require('brisky-core')

module.exports.prototype.inject(
  require('brisky-events/lib/rightclick'),
  require('brisky-events/lib/basic'),
  require('brisky-events/lib/force'),
  require('brisky-events/lib/hover'),
  require('brisky-events/lib/drag'),
  require('brisky-events/lib/key'),
  require('brisky-props'),
  require('brisky-focus'),
  require('brisky-class'),
  require('brisky-style')
)
