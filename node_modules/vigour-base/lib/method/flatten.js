'use strict'
var Base = require('../')
var wrapFilter = require('vigour-util/wrapfilter')
var flatten = require('vigour-util/flatten')

exports.define = {
  /**
   * Flatten a `Base` object
   * @memberOf Base#
   * @return {object}
   */
  flatten: function (filter) {
    var obj = {}
    var val = this.__input

    this.each(function (property, key) {
      obj[key] = property.flatten ? property.flatten(filter) : property
    }, wrapFilter(filter))

    if (val !== void 0) {
      if (val instanceof Base) {
        val = {
          reference: val.path
        }
      }
      obj.val = val
    }

    // refactoring non standard keys
    var flattened = flatten(obj)
    for (var key in flattened) {
      if (key.indexOf('.val') > 0) {
        var newKey = key.split('.val')[0]
        flattened[newKey] = flattened[key]
        delete flattened[key]
      }
    }
    return flattened
  }
}
