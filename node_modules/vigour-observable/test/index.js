'use strict'
var Observable = require('../')
var isEmpty = require('vigour-util/is/empty')
var isRemoved = require('vigour-util/is/removed')
var test = require('tape')

test('references, keys and remove', function (t) {
  var fired = 0
  var obs = new Observable({
    a: true,
    properties: {
      b: true
    },
    on: {
      data () {
        fired++
      }
    }
  })
  t.plan(5)
  t.equal(obs.keys().length, 1)
  var obs2 = new Observable()
  obs.val = obs2
  t.equal(fired, 1)
  t.equal(obs.__input, obs2)
  obs.val = void 0
  t.equal(fired, 2)
  t.equal(obs2.__input, void 0)
})
