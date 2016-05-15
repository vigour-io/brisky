'use strict'

var test = require('tape')
var badges = require('../')

var testCases = [
  [{ npm: { package: 'vigour-doc-badges' } }, '[![npm version](https://badge.fury.io/js/vigour-doc-badges.svg)](https://badge.fury.io/js/vigour-doc-badges)']
]
var len = testCases.length

test('npm', function (t) {
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    t.equals(badges(testCases[i][0]),
      testCases[i][1],
      'badges(' + JSON.stringify(testCases[i][0]) + ') === ' + testCases[i][1]
    )
  }
})
