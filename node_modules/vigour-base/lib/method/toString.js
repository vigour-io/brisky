'use strict'
/**
 * @function toString
 * @memberOf Base#
 * @param  {fn} exclude. Optional function to exclude properties. It defaults
 * to ignore keys that starts with ' (e.g.:key)
 * @return {string} String of the object, including stringified functions
 */
exports.inject = require('./plain')

exports.define = {
  toString: function (filter) {
    return JSON.stringify(this.plain(filter), false, 2)
  }
}
