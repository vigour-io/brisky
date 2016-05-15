'use strict'

module.exports = function resolveNameSpace (pkg, nameSpace) {
  if (!pkg) {
    return pkg
  }
  var spaced = pkg[nameSpace]
  if (spaced) {
    var result = {
      name: pkg.name,
      version: pkg.version
    }
    for (var key in spaced) {
      result[key] = spaced[key]
    }
    return result
  }
  return pkg
}
