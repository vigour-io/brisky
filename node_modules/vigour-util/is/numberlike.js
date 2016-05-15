'use strict'
var isNumber = require('./number')

module.exports = function isNumberLike (val) {
  if (val === null || val === void 0 || val === false) {
    return
  }
  var length = val.length
  if (!length) {
    return isNumber(val)
  }
  var i = 0
  // charAt is faster in v8
  if (val.charAt(0) === '-') {
    if (length === 1) {
      return
    }
    i = 1
  }
  for (; i < length; i++) {
    var c = val.charAt(i)
    // bit range is outside number range
    if (c <= '/' || c >= ':') {
      return
    }
  }
  return true
}
