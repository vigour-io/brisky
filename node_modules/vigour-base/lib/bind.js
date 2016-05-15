'use strict'

exports.getBind = function (previousValue) {
  var bind = this.bind
  if (bind) {
    let type = typeof bind
    if (type === 'function') {
      bind = bind.call(this, previousValue)
    } else if (type === 'string') {
      // how to solve context in here?
      bind = this.get(bind)
    }
    return bind
  }
  return this
}
