'use strict'
var Base = require('../')
var helpers = require('./shared')
var clean = helpers.clean
var getPath = helpers.getPath
var returnFilter = helpers.returnFilter
var returnPath = helpers.returnPath

/**
 * @function find
 * @memberOf Base#
 * @param  {string|string[]} path Path or field to find
 * @param  {*} [options] {regexp} Results will be tested using rexexp
 * <br>{base|string|boolean} Use options to compare with results
 * <br>{function} Call for each result, with result as param
 * <br>{object} Can contain the following:
 * @param  {number} options.cap Will end search after x results
 * @param  {object} options.conditions Results will be tested by these conditions
 * <br> Not supported yet.
 * @return {array} Array of results
 */

exports.define = {
  find: function (path, options) {
    path = returnPath(path)
    var cap
    // var conditions - add this later
    var index = 0
    var isBase
    var filter
    var length = path.length
    var results
    if (options !== void 0) {
      cap = options.cap
      results = options.results
      filter = returnFilter(options)
      if (results) {
        isBase = results instanceof Base
      } else {
        results = []
      }
    } else {
      results = []
    }
    function searchObj (obj) {
      var result = getPath(obj, path, length, filter)
      var value
      if (result) {
        if (isBase) {
          results.setKeyInternal(index++, result)
        } else {
          results[index++] = result
        }
      }

      if (cap === void 0 || index < cap) {
        for (var key$ in obj) {
          if (key$[0] !== '_' && (!obj._properties || !obj._properties[key$])) {
            value = obj[key$]
            if (value && typeof value === 'object') {
              searchObj(value)
            }
          }
        }
      }
      return results
    }
    return clean(searchObj(this), index)
  }
}
