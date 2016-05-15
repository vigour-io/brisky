'use strict'
require('../style.css')
const State = require('vigour-state')
const render = require('../../lib/render')
const s = new State({
  c: {
    val: 'bla',
    d: { e: 'e' }
  }
}, false)

const app = {
  key: 'app',
  text: 'root',
  holder: {
    a: {
      class: 'complex-item',
      $: 'a',
      b: {
        text: { $: '$root.b' },
        c: {
          text: { $: '$root.c', $prepend: 'a.b.c: ' }
        }
      }
    },
    collection: {
      $any: true,
      $: 'collection',
      Child: {
        class: 'basic-item',
        text: { $: '$root.c' }
      }
    }
  }
}

document.body.appendChild(
  render(
    app,
    s,
    (state, type, stamp, subs, tree, stype) => {
      console.log('  fire:', state.path().join('/'), type, stype || 'normal')
    }
  )
)

console.log('\ncreate root b')
s.set({ b: 'b init' })

console.log('\nupdate root b (update 1)')
s.set({ b: 'b update 1' })

console.log('\ninit c, set a')
s.set({ c: 'c init' })
s.set({ a: {} })

s.set({
  collection: [1, 2, 3, 4]
})

console.log('\nupdate c (update 1)')
s.c.set('c update 1')

console.log('\nupdate c (update 2)')
s.c.set('c update 2')
