'use strict'
var Base = require('../')
var helpers = require('./shared')
var clean = helpers.clean
var returnFilter = helpers.returnFilter
/**
 * @function filter this (array or object) and returns the results in an array object.
 *  By default, it tries to check the object itself or itsvalue, if defined.
 * @memberOf Base#
 * @param  {*} options: can be a single value to be filtered, a specific filter function
 *  or an array of values you want to be filtered.
 * @return {base}
 */
exports.define = {
  filter (options) {
    var results = (options && options.results) || []
    var filter = returnFilter(options)
    var isBase = results && results instanceof Base
    var index = 0
    for (let key in this) {
      if (key[0] !== '_') {
        let child = this[key]
        if (filter === void 0 || filter(child)) {
          if (isBase) {
            results.setKeyInternal(index++, child)
          } else {
            results[index++] = child
          }
        }
      }
    }
    return clean(results, index)
  }
}
