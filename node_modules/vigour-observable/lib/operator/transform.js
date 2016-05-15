'use strict'
var Operator = require('./')

exports.inject = require('./val')

exports.properties = {
  $transform: new Operator({
    key: '$transform',
    operator: function (val, event, operator, origin) {
      return operator.parseValue(val, event, origin)
    },
    Child: 'Constructor'
  })
}
