'use strict'
const render = require('../render')

test('render - cases', function (t) {
  t.same(parse(elem), '<div class="bla"></div>', 'add cases')
  t.end()
})
