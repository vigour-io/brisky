'use strict'
var Operator = require('./')

exports.inject = require('./val')

exports.properties = {
  $time: new Operator({
    key: '$time',
    operator: function (time, event, operator, origin) {
      var decimals = this.$time.parseValue(time, event, origin)
      var hrs = ~~(time / 3600)
      var mins = ~~((time % 3600) / 60)
      var secs = decimals && decimals !== true ? (time % 60).toFixed(decimals) : ~~(time % 60)
      var ret = ''
      if (hrs > 0) ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
      ret += '' + mins + ':' + (secs < 10 ? '0' : '')
      ret += '' + secs
      return ret || 0
    },
    Child: 'Constructor'
  })
}

