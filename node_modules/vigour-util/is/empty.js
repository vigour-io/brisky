'use strict'
module.exports = function isEmpty (obj) {
  if (obj.each) {
    obj.each(function (property, key) {
      if (property.__input !== null) {
        return false
      }
    })
  } else {
    for (var key in obj) { // eslint-disable-line
      return false
    }
  }
  return true
}
