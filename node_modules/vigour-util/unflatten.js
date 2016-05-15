'use strict'
/**
 * @function Unflatten an object with delimited keys
 * @param  {object} subject - Object that needs to be unflattened
 * @param  {string} [seperator] - Optional seperator sign
 * @return {object} - Nested Javascript object
 */

module.exports = unflatten

function unflatten (obj, separator) {
  separator = separator || '.'
  var newObj = {}
  each(obj, function (val, keys) {
    var partitions = keys.split(separator)
    var result = newObj
    var len = partitions.length - 1
    each(partitions, function (keys, i) {
      result = result[keys] = (i === len ? val : (result[keys] || {}))
    })
  })
  return newObj
}

function each (obj, fn) {
  for(var i in obj) {
    fn(obj, obj[i])
  }
}