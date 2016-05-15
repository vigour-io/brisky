'use strict'
var isStream = require('./stream')

module.exports = function isPlainObj (obj) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !obj._base_version &&
    !(obj instanceof Buffer) &&
    !(isStream(obj))
  )
}
