'use strict'
var Operator = require('./')

exports.inject = require('./val')

exports.properties = {
  $multiply: new Operator({
    key: '$multiply',
    operator: function (val, event, operator, origin) {
      return val * operator.parseValue(val, event, origin)
    },
    Child: 'Constructor'
  })
}
