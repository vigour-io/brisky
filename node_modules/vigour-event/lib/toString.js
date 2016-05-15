'use strict'
/**
 * @function toString
 * convert an event to a string, convienience function for development
 * @memberOf Event#
 * @returns {string}
 */
exports.toString = function () {
  var str = ''
  for (var key in this) {
    var field = this[key]
    if (key === 'queue') {
      str += '\n' + key + ' : '
      for (var i in field) {
        str += '\n  > ' + field[i].path.join('.')
      }
    } else {
      str += '\n' + key + ' : ' +
        (field._base_version
          ? field._path + ' ---- ' + field.path
          : field)
    }
  }
  return str
}
