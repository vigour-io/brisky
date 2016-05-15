'use strict'

var test = require('tape')
var convertReturns = require('../../lib/tags/returns')
var jsdoc2md = require('../../')

test('convertReturns', function (t) {
  var testCases = [
    [' * @returns {number} length - number of entries',
      '- **returns** (*number*) length - number of entries'],
    [' * @returns length - number of entries',
      '- **returns** length - number of entries'],
    [' * @returns length -',
      '- **returns** length'],
    [' * @returns {number} length -',
      '- **returns** (*number*) length'],
    [' * @returns {number} length',
      false],
    [' * @returns name {type} - description',
      '- **returns** (*type*) name - description']
  ]
  var len = testCases.length
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    var parts = testCases[i][0].match(jsdoc2md.lineRE)
    var tagName = parts[1]
    var name = parts[2]
    var type = parts[3]
    var rest = parts[4]
    t.equals(convertReturns(testCases[i][0], 0, [testCases[i][0]], tagName, name, type, rest),
      testCases[i][1],
      'test case i=' + i)
  }
})
