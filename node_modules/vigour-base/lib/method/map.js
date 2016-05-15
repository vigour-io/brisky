'use strict'

/**
 * @function map
 * Iterates through every root property of this object and executes the function passed by parameter,
 * pushing its results and returning it in the end.
 * @memberOf Base#
 * @param  {Function} fn
 * @param  {Function} excludes
 * <br> Optionally pass a function to be executed and return which iterations should be ignored
 *  by the map function
 * @return {*}
 */
exports.define = {
  map: function (fn, filter) {
    var arr = []
    this.each(function () {
      arr.push(fn.apply(this, arguments))
    }, filter)
    return arr
  }
}
