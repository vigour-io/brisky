'use strict'

var test = require('tape')
var convertId = require('../../lib/tags/id')

test('convertId', function (t) {
  t.plan(1)
  t.equals(convertId(), false, 'convertId returns false')
})
