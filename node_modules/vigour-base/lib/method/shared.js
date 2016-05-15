'use strict'
var isPlainObj = require('vigour-util/is/plainobj')
var createPath
var getPath

exports.clean = function (obj, index) {
  if (obj.constructor === Array) {
    return obj.splice(0, index)
  }
  while (obj[index]) {
    delete obj[index++]
  }
  return obj
}

exports.createPath = createPath = function (obj, path, length, set, event) {
  var setObj = {}
  var nextObj = setObj
  var i = 0
  var field
  for (;i < length - 1; i++) {
    field = path[i]
    nextObj[field] = {}
    nextObj = nextObj[field]
  }
  if (set !== void 0) {
    nextObj[path[i]] = set
  } else {
    nextObj[path[i]] = {}
  }
  // event must be possible to pass along!
  obj = obj.set(setObj, event) || obj
  return getPath(obj, path, length)
}

exports.getPath = getPath = function (obj, path, length, filter, set, event) {
  var i = 0
  var result = obj[path[0]]

  while (result) {
    if (++i === length) {
      if (filter === void 0 || filter(result, obj)) {
        return result
      }
    }
    obj = result
    result = result[path[i]]
  }

  if (set !== void 0) {
    return createPath(obj, path.splice(i), length - i, set, event)
  }
}

exports.returnFilter = function (options) {
  if (options !== void 0) {
    if (typeof options === 'function') {
      return options
    }

    if (isPlainObj(options)) {
      if (options instanceof RegExp) {
        return function (subject) {
          return options.test(subject)
        }
      }

      if (options.constructor === Array) {
        var length = options.length
        return (subject) => {
          for (let i = length - 1; i >= 0; i--) {
            let value = options[i]
            if (subject === value || subject.val === value) {
              return true
            }
          }
        }
      }
    } else {
      return (subject) => subject === options || subject.val === options
    }
  }
}

exports.returnPath = function (path) {
  return typeof path === 'string' ? path.split('.') : path
}
