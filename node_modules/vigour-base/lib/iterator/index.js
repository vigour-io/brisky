'use strict'
/**
 * @property @@iterator
 * injectable es6 for of support
 * @memberOf Base#
*/
var isNode = require('vigour-util/is/node')
if (!isNode) {
  require('./browser')
}
module.exports = function (base) {
  if (typeof Symbol === 'undefined') {
    // console.error('Symbol is undefined, iterator will fail hard!')
  } else {
    base[Symbol.iterator] = function * baseIterator () {
      var properties = this._properties
      for (var i in this) {
        if (i[0] !== '_' && !properties[i] && this[i] !== null) {
          yield this[i]
        }
      }
    }
  }
}
