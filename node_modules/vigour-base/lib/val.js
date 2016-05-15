'use strict'
var Base = require('./')

/**
 * @function parseValue
 * parses output, can be references, itself, input value or ouput
 * bind is used as the callee to pass to functions defined in __input
 * @memberOf Base#
 * @param {*} previousValue  previous value continue parsing
 * @param {base} origin origin of current parsed value loop
 * @todo bind has to be used for emitters as well not only here!
 * @todo add more bind options e.g. parent.parent (be carefull with context!)
 */
exports.parseValue = function (previousValue, event, origin) {
  var val
  // previous val is maybe a bad idea
  if (!this._ignoreInput && this.__input !== void 0) {
    if (!origin) {
      origin = this
    }

    let input = this.__input
    let output = this.output
    val = output !== void 0 ? output
        : input !== void 0 ? input : void 0

    if (val) {
      let bind = this.getBind(previousValue, event)
      if (bind) {
        if (typeof val === 'function') {
          val = val.call(bind, previousValue)
        } else if (val instanceof Base) {
          if (val !== origin) {
            val = val.parseValue(void 0, event, origin)
          }
          //  else {
            // throw new Error(
            //   'parsingValue from same origin (circular)' +
            //   '\npath:' + this.path,
            //   '\norigin:' + origin.path
            // )
          // }
        }
      }
    }
    if (val === void 0) {
      val = this
    }
  } else {
    val = previousValue
  }
  return val
}

/**
 * @property origin
 * returns the origin of the value (resolved over references)
 * @type {base}
 */
exports.origin = {
  get () {
    var reference = this
    while (reference.__input instanceof Base) {
      reference = reference.__input
    }
    return reference
  }
}

/**
 * @property value
 * getter and setter to either parse value (on get) or call .set (on set)
 * @type {*}
 */
exports.val = {
  get () {
    return this.parseValue()
  },
  set (val) {
    this.set(val)
  }
}
