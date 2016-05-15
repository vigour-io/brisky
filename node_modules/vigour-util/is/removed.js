'use strict'
module.exports = function isRemoved (base) {
  for (var key in base) {
    // use each for this one
    if (base.hasOwnProperty(key)) {
      // temp fix -- should become configurable
      // this thing is only used in tests however
      if (base[key] !== null &&
        key !== 'key' &&
        key !== 'lastStamp' &&
        key !== '_parent' &&
        key !== '_uid'
      ) {
        return false
      }
    }
  }
  if (base.__input !== null) {
    return false
  }
  return true
}
