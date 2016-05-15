'use strict'

var test = require('tape')
var badges = require('../')

var expected = '[![Build Status](https://travis-ci.org/vigour-io/doc-badges.svg?branch=master)](https://travis-ci.org/vigour-io/doc-badges)'
var testCases = [
  [{ travis: { owner: 'vigour-io', repo: 'doc-badges' } }, expected],
  [{ travis: { owner: 'vigour-io', repo: 'doc-badges', branch: 'master' } }, expected]
]
var len = testCases.length

test('travis', function (t) {
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    t.equals(badges(testCases[i][0]),
      testCases[i][1],
      'badges(' + JSON.stringify(testCases[i][0]) + ') === ' + testCases[i][1]
    )
  }
})
