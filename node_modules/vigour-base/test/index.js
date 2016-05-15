'use strict'
var test = require('tape')
var isEmpty = require('vigour-util/is/empty')
var isRemoved = require('vigour-util/is/removed')
var Base = require('../')

test('keys', function (t) {
  var base = new Base({
    a: true,
    b: true
  })
  t.plan(6)
  t.equal(base.keys().length, 2)
  base.removeProperty(base.a, 'a')
  t.equal(base.keys().length, 1)
  base.setKey('c', true)
  t.equal(base.keys().length, 2)
  base.clear()
  t.equal(isEmpty(base), true)
  t.equal(base.keys(), false)
  base.set({ d: true })
  t.equal(base.keys().length, 1)
})
