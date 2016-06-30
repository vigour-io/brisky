'use strict'
const render = require('../render')
const test = require('tape')
const parse = require('parse-element')

test('render - cases', function (t) {
  var elem = render({}, false, { $bla: true })
  t.same(parse(elem), '<div class="bla"></div>', 'add cases')
  t.end()
})
