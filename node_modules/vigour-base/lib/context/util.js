'use strict'
/**
 * @function clearContext
 * Clears context of a base
 * @memberOf Base#
 * @type {base}
 */
exports.clearContext = function () {
  if (this._context) {
    this._contextLevel = null
    this._context = null
  }
  return this
}

/**
 * @function clearContextUp
 * Clears all context over the parent chain
 * @memberOf Base#
 * @param {int} level - Specify maximum amount of levels to clear
 * @type {base}
 */
exports.clearContextUp = function (level) {
  var parent = this
  var i = 0
  while (parent && (!level || i < level)) {
    i++
    parent.clearContext()
    parent = parent._parent
  }
  return this
}

exports.cleanContextPath = function (path) {
  let lwalk
  let walk = this
  for (let i = 0, length = path.length; walk && i < length; i++) {
    lwalk = walk
    walk = walk['_' + path[i]] || walk[path[i]]
    lwalk.clearContext()
  }
  if (walk) {
    walk.clearContext()
  }
  return this
}

/**
 * @function isContextCandidate
 * check if a key is a candidate for context getters
 * @memberOf Base#
 * @return {*} returns the field value or undefined
 */
exports.contextCandidate = function (key) {
  var value = this[key]
  if (
    value &&
    value.createContextGetter &&
    !value.noContext &&
    !this['_' + key] &&
    // this an become a lot faster
    (key[0] !== '_' || this._properties && this._properties[key] && this._properties[key].override === key)
  ) {
    // console.log('lezzzgo!', key)
    return value
  }
}