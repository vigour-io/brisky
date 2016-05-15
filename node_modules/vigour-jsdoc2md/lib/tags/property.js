'use strict'

var _trim = require('lodash.trim')

module.exports = exports = function convertProperty (line, i, lines, tagName, name, type, rest) {
  // console.log('line', line)
  // console.log('tagName', tagName)
  // console.log('name', name)
  // console.log('type', type)
  // console.log('rest', rest)
  if (!rest) {
    return false
  }
  rest = _trim(rest).split('-')
  var maybeName = _trim(rest.shift())
  var propName = name || maybeName
  rest = _trim(rest.join('-'))
  var tagPart = '#### .' + propName
  var typePart = type ? ' (*' + type + '*)' : ''
  return tagPart + typePart + '\n\n' + rest
}
