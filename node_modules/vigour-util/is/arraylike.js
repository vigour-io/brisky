'use strict'
/**
 * If the OBJ in argument as an Array like structure returns an Array
 * @param  {object}  obj  The object that we wanto to transform in Array
 * @return {object}       The obj in argument translated to Array (if possible)
 */
module.exports = function isArrayLike (obj) {
  var type = typeof obj
  if (type !== 'string' && type !== 'boolean' && type !== 'number' && obj) {
    var keys = Object.keys(obj)
    if (keys.length > 0) {
      var expectedSum, originalSum
      originalSum = keys.reduce(sum, 0)
      if (!isNaN(originalSum)) {
        expectedSum = []
        for (var i = keys.length - 1; i >= 0; i--) {
          expectedSum.push(i)
        }
        expectedSum = expectedSum.reduce(sum, 0)
        if (expectedSum === originalSum) {
          obj = keys.map(function (val) {
            return obj[val]
          })
        }
      }
    }
  }
  return obj
}

function sum (prev, curr) {
  return parseInt(prev, 10) + parseInt(curr, 10)
}
