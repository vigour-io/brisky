'use strict'

var test = require('tape')
var convertProperty = require('../../lib/tags/property')
var jsdoc2md = require('../../')

test('convertProperty', function (t) {
  var testCases = [
    [' * @property {number} length - number of entries',
      '#### .length (*number*)\n\nnumber of entries'],
    [' * @property flammable - whether it burns easily under normal conditions',
      '#### .flammable\n\nwhether it burns easily under normal conditions']
  ]
  var len = testCases.length
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    var parts = testCases[i][0].match(jsdoc2md.lineRE)
    var tagName = parts[1]
    var name = parts[2]
    var type = parts[3]
    var rest = parts[4]
    t.equals(convertProperty(testCases[i][0], 0, [testCases[i][0]], tagName, name, type, rest),
      testCases[i][1],
      'test case i=' + i)
  }
})
