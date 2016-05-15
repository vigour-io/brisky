exports.isNode = typeof window === 'undefined'

exports.merge = function (a, b, norefs, overwrite) {
  for (var i in b) {
    var aisobj = exports.isObj(a[i])
    var bisobj = exports.isObj(b[i])

    if (aisobj && bisobj) {
      exports.merge(a[i], b[i], norefs)
    } else if (!norefs || !bisobj) {
      if (overwrite === void 0 ||
        !(i in a) ||
        typeof overwrite === 'function' && overwrite(a[i], b[i])
      ) {
        a[i] = b[i]
      }
    } else {
      a[i] = b[i] instanceof Array ? [] : {}
      exports.merge(a[i], b[i], norefs, overwrite)
    }
  }
  return a
}

exports.isObj = function (obj) {
  return (obj instanceof Object &&
  typeof obj !== 'function')
}
