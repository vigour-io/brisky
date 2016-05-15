'use strict'
var helpers = require('./shared')
var createPath = helpers.createPath
var returnPath = helpers.returnPath

/**
 * @function setWithPath
 * @memberOf Base#
 * @param  {string|string[]} path Path or field in which the set (if provided) will
 * be applied.
 * @param  {*} [set] Value to set on path end
 * @return {base}
 */
exports.define = {
  setWithPath: function (path, set) {
    path = returnPath(path)
    return createPath(this, path, path.length, set)
  }
}
