'use strict'
var Operator = require('./')

exports.inject = require('./val')

exports.properties = {
  $add: new Operator({
    key: '$add',
    operator (val, event, operator, origin) {
      return val + operator.parseValue(val, event, origin)
    },
    Child: 'Constructor'
  })
}
