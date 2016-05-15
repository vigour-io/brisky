'use strict'

module.exports = function setWithPath (obj, path, val, i) {
  if (!i) {
    i = 0
  }
  var ret = obj
  if (path.length - 1 === i) {
    ret = obj[path[i]] = val
  } else {
    obj[path[i]] = {}
    ret = setWithPath(obj[path[i]], path, val, (i + 1))
  }
  return ret
}
