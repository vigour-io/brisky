'use strict'

var include = module.exports = function include (target, thing) {
  return typeof thing === 'object'
    ? includeList(target, thing)
    : includeItem(target, thing)
}

var includeList = include.list = function includeList (target, list) {
  var result = false
  for (let i in list) {
    var included = includeItem(target, list[i])
    if (included) {
      if (!result) {
        result = [included]
      } else {
        result.push(included)
      }
    }
  }
  return result
}

var isIncluded = include.isIncluded = function isIncluded (target, item) {
  for (let j = target.length - 1; j >= 0; j--) {
    if (target[j] === item) {
      return true
    }
  }
}

var includeItem = include.item = function includeItem (target, item) {
  return !isIncluded(target, item) && target.push(item)
}
