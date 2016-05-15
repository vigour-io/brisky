'use strict'

exports.define = {
  readSerialized: function readSerialized (input, root) {
    if (!root) {
      root = this
    }
    
    for (let key in input) {
      let prop = input[key]
      let val = prop.val
      if (val !== void 0) {
        if (val && val.reference instanceof Array) {
          let path = val.reference.slice(1)
          let reffed = root.get(path, {})
          prop.val = reffed
        }
      } else {
        readSerialized(prop, root)
      }
    }

    root.set(input)
  }
}
