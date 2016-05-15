'use strict'
/**
 * @function trigger
 * loop trough event queue
 * @memberOf Event#
 */
// test later if faster
module.exports = function () {
  if (!this._triggered) { // this should go -- dont make it wrong better to error
    this._triggered = true
    for (var uid in this) {
      if (!this.properties[uid]) {
        this[uid].val.trigger(this[uid], this)
      }
    }
    this.remove()
  }
}
