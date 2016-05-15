'use strict'

var _trim = require('lodash.trim')

module.exports = exports = function convertOther (line, i, lines, tagName, name, type, rest) {
  // console.log('line', line)
  // console.log('tagName', tagName)
  // console.log('type', type)
  // console.log('rest', rest)
  var tagPart = '- **' + tagName + '**'
  var typePart = type ? ' {*' + type + '*}' : ''
  var namePart = (name
    ? (name.slice(0, 1) === ' ' || name.slice(0, 1) === '\t' ? '' : ' ') + name
    : '')
  var restPart = (rest.slice(0, 1) === ' ' || rest.slice(0, 1) === '\t' ? '' : ' ') + rest || ''
  var newLine = tagPart + typePart + namePart + restPart
  return _trim(newLine)
}
