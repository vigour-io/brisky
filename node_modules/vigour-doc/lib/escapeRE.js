'use strict'

module.exports = exports = function escapeRE (str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
