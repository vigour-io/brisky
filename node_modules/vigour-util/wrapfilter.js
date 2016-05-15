'use strict'

/**
 * Wraps the filter function in plain and flatten methods
 * @param  {Function} fn    The filter function
 * @return {Function}       The wrapped function
 */
module.exports = function wrapfilter (fn) {
  if (!fn) {
    return void 0
  }
  return function (val, key, base) {
    if (base && base._properties[key]) {
      return false
    }
    return fn(val, key)
  }
}
