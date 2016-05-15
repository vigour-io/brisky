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
  rest = _trim(rest)
  if (!name) {
    let idx = rest.indexOf('-')
    if (idx !== -1) {
      name = rest.slice(0, idx)
      rest = rest.slice(idx + 1)
    } else {
      let idx = rest.indexOf(' ')
      if (idx !== -1) {
        name = rest.slice(0, idx)
        rest = rest.slice(idx + 1)
      } else {
        name = rest
        rest = ''
      }
    }
  } else {
    let idx = rest.indexOf('-')
    if (idx !== -1) {
      rest = rest.slice(idx + 1)
    } else {
      let idx = rest.indexOf(' ')
      if (idx !== -1) {
        rest = rest.slice(idx + 1)
      } else {
        rest = ''
      }
    }
  }

  name = _trim(name)
  rest = rest ? ' - ' + _trim(rest) : ''
  var tagPart = '- **' + name + '**'
  var typePart = type ? ' (*' + type + '*)' : ''
  return tagPart + typePart + rest
}
