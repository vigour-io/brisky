'use strict'

module.exports = function getAllPropertyDescriptors (obj) {
  var definitions = {}
  var arr
  // loop trough protos
  var proto = obj
  while (proto) {
    arr = Object.getOwnPropertyNames(proto)
    for (var i in arr) {
      if (!definitions[arr[i]]) {
        definitions[arr[i]] = Object.getOwnPropertyDescriptor(proto, arr[i])
      }
    }
    proto = Object.getPrototypeOf(proto)
  }
  return definitions
}
