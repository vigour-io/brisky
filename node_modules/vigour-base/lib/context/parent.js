'use strict'
/**
 * @property parent
 * Parent of base object
 * gets the context-resolved parent of a base
 * @memberOf Base#
 * @type {base|undefined}
 * @todo think about set, is this event behaviour we want to support?
 */
exports.parent = {
  get: function () {
    var level = this._contextLevel
    var context
    var parent
    if (level) {
      context = this._context
      if (level === 1) {
        return context
      }
      parent = this._parent
      if (parent && !parent._context !== context) {
        parent._context = context
        parent._contextLevel = level - 1
      }
    } else {
      parent = this._parent
      if (parent && parent._context) {
        parent.clearContext()
      }
    }
    return parent
  }
}
