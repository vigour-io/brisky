'use strict'
module.exports = function (obj) {
  var referenced = obj.__input
  if (referenced &&
    referenced._base_version &&
    referenced.__input !== null) {
    return referenced
  }
}
