'use strict'

var test = require('tape')
var badges = require('../')

var testCases = [
  [{ standard: { style: 'shield' } }, '[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)'],
  [{ standard: { style: 'badge' } }, '[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com/)']
]
var len = testCases.length

test('standard', function (t) {
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    t.equals(badges(testCases[i][0]),
      testCases[i][1],
      'badges(' + JSON.stringify(testCases[i][0]) + ') === ' + testCases[i][1]
    )
  }
})
