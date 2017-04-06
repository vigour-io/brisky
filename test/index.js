'use strict'
const render = require('../')
const test = require('tape')
const h = require('hub.js')

test('render',  t => {

  const B = (({ dirty, dweep = 'pink' }) => {
    return h('div', { style: { color: dweep } }, dirty)
  })

  const hub = h({ dirty: 'its some text', dweep: 'blue' })
  hub.subscribe({
    val: 'shallow',
    _: {
      property: [
        (state, type, subs, tree) => {
          console.log(tree)
          // hard compuled id (allways an int faster)
          if (tree._[1]) {

          }
        }
      ]
    },
    dirty: {
      val: 'shallow',
      _: {
        update: []
      },
    },
    dweep: {
      val: 'shallow',
      _: {
        update: []
      }
    }
  }, (state, type, subs, tree) => {
    console.log('----->', subs)
    const _ = subs._
    if (_) {
      // also add _ parent on subs to find what your parent node is
      // also store the ids
      if (type !== 'update' && _.property) {
        let i = _.property.length
        while (i--) {
          console.log('x?')
          _.property[i](state, type, subs, tree)
        }
      }
    }
  })

  t.end()
})
