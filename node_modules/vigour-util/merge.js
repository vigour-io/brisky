'use strict'
const OBJ = 'object'

module.exports = function merge (a, b, checked) {
  if (checked || typeof a === OBJ) {
    for (let key in b) {
      let bProp = b[key]
      if (typeof bProp === OBJ) {
        let aProp = a[key]
        if (typeof aProp !== OBJ) {
          a[key] = aProp = {}
        }
        merge(aProp, bProp, true)
      } else {
        a[key] = bProp
      }
    }
    return a
  }
}
