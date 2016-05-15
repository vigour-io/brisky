'use strict'
var email = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,20}$/
module.exports = function (val) {
  return typeof val === 'string' && email.test(val)
}
