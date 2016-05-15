'use strict'

var test = require('tape')
var convertOther = require('../../lib/tags/other')
var jsdoc2md = require('../../')

test('convertOther', function (t) {
  var testCases = [
    [' * @hello {world} peace - this is nice ',
      '- **hello** {*world*} peace - this is nice'],
    [' * @hello world - this is nice',
      '- **hello** world - this is nice'],
    [' * @tag name {type} - this is nice',
      '- **tag** {*type*} name - this is nice']
  ]
  var len = testCases.length
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    var parts = testCases[i][0].match(jsdoc2md.lineRE)
    var tagName = parts[1]
    var name = parts[2]
    var type = parts[3]
    var rest = parts[4]
    t.equals(convertOther(testCases[i][0], 0, [testCases[i][0]], tagName, name, type, rest),
      testCases[i][1],
      'test case i=' + i)
  }
})
