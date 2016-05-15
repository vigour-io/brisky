'use strict'
var parseValue = require('vigour-base').prototype.parseValue
// -----------------------------
exports.define = {
  parseValue (previousValue, event, origin, start, end, val) {
    val = parseValue.call(this, previousValue, event, origin)
    return parseOperatorsDefault.call(this, val, event, origin)
  }
}

exports._keylists = [ '_keys', '_operators' ]

function isOperator (val, key) {
  return val[key] && val[key]._operator
}

function parseOperatorsDefault (val, event, origin) {
  var operators = this.keys('_operators', isOperator)
  if (operators) {
    for (let i in operators) {
      let operator = this[operators[i]]
      resolveOperatorContext(operator, this)
      let bind = operator.getBind()
      if (bind) {
        val = operator._operator.call(bind, val, event, operator, origin)
      }
      operator.clearContext()
    }
  }
  return val
}

function resolveOperatorContext (operator, parent) {
  if (operator._parent !== parent) {
    operator._context = parent
    operator._contextLevel = 1
  } else if (parent._context) {
    operator._context = parent._context
    operator._contextLevel = parent._contextLevel + 1
  }
}
