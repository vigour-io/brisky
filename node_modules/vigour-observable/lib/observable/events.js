'use strict'
var Event = require('vigour-event')
exports.Data = function DataEvent () {
  Event.apply(this, arguments)
}
exports.Data.prototype = new Event()
exports.Data.prototype.type = 'data'

exports.New = function NewEvent () {
  Event.apply(this, arguments)
}
exports.New.prototype = new Event()
exports.New.prototype.type = 'new'
