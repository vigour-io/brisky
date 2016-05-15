'use strict'
exports.eachContext = function (fn, arg) {
  var contextUp = this._context
  var contextUpCache
  if (contextUp) {
    if (fn(this._contextLevel, contextUp, arg)) {
      return true
    }
  }
  while (contextUp) {
    contextUpCache = contextUp._context
    if (contextUpCache) {
      // reverse would be a lot nicer but pretty impossible
      if (fn(contextUp._contextLevel, contextUpCache, arg)) {
        return true
      }
      contextUp = contextUpCache
    } else {
      // may need to fan out
      contextUp = false
    }
  }
}

exports.contextMap = function (cache) {
  if (!cache) {
    if (!this.hasOwnProperty('_hashCache')) {
      cache = this._contextMap = {}
    } else {
      cache = this._contextMap
    }
  }
  this.eachContext(function (level, cntxt) {
    var uid = cntxt.uid
    if (!cache[uid]) {
      cache = cache[uid] = {
        _: level
      }
    } else {
      cache = cache[uid]
    }
  })
  return cache
}
