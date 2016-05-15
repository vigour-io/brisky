'use strict'
var helpers = require('./shared')
var returnPath = helpers.returnPath
var getPath = helpers.getPath
var returnFilter = helpers.returnFilter

/**
 * @function lookDown
 * @memberOf Base#
 * @param  {string|string[]} path Path or field to find in children
 * @param  {*} [options] {regexp} Results will be tested using rexexp
 * <br>{base|string|boolean} Use options to compare with results
 * <br>{function} Call for each result, with result as param
 * <br>{object} Can contain the following:
 * @param  {object} options.conditions Results will be tested by these conditions
 * @return {object} result
 */
exports.define = {
  lookDown (path, options) {
    path = returnPath(path)
    var child, children, index, siblings
    var filter = returnFilter(options)
    var length = path.length
    var result = getPath(this, path, length, filter)
    if (result) {
      return result
    }

    for (let key$ in this) {
      if (key$[0] !== '_') {
        child = this[key$]
        if (!child || typeof child !== 'object') {
          continue
        }
        if ((result = getPath(child, path, length, filter))) {
          return result
        }
        if (siblings) {
          siblings[++index] = child
        } else {
          index = 0
          siblings = [child]
        }
      }
    }

    while (siblings) {
      for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i]
        for (let key$ in sibling) {
          if (key$[0] !== '_') {
            child = sibling[key$]
            if (!child || typeof child !== 'object') {
              continue
            }
            if ((result = getPath(child, path, length, filter))) {
              return result
            }
            if (children) {
              children[++index] = child
            } else {
              index = 0
              children = [child]
            }
          }
        }
      }
      siblings = children
      children = false
    }
  }
}
