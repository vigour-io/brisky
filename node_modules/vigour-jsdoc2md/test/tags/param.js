'use strict'

var test = require('tape')
var convertParam = require('../../lib/tags/param')
var jsdoc2md = require('../../')

test('convertParam', function (t) {
  var testCases = [
    [' * @param {type} name - description',
      '- **name** (*type*) - description'],
    [" * @arg name - this one doen't declare a type",
      "- **name** - this one doen't declare a type"],
    [' * @param name {type} - description',
      '- **name** (*type*) - description'],
    ['* @param startTime {number|array} - start time for elapsed time calculation',
      '- **startTime** (*number|array*) - start time for elapsed time calculation']
  ]
  var len = testCases.length
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    var parts = testCases[i][0].match(jsdoc2md.lineRE)
    var tagName = parts[1]
    var name = parts[2]
    var type = parts[3]
    var rest = parts[4]
    t.equals(convertParam(testCases[i][0], 0, [testCases[i][0]], tagName, name, type, rest),
      testCases[i][1],
      'test case i=' + i)
  }
})
