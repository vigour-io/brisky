'use strict'
var stream = require('stream')
var Writable = stream.Writable
var Duplex = stream.Duplex
var Readable = stream.Readable
// transform, duplex, writable, readabe

module.exports = exports = function (val) {
  return val && (
    val instanceof Duplex ||
    val instanceof Readable ||
    val instanceof Writable
  )
}

exports.readable = function (val) {
  return val && (
    val instanceof Readable || val instanceof Duplex
  )
}
