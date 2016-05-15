'use strict'
require('../style.css')
const render = require('../../lib/render')
const components = require('./components')
const s = require('vigour-state/s')
const state = s({ title: 'third' })
const app = {
  inject: components,
  text: 'order',
  key: 'app',
  Child: { class: 'holder' },
  properties: { texts: { type: 'texts' } },
  texts: [ '-', { $: 'first.text' }, '-' ],
  updateText: {
    class: 'basic-item',
    text: 'update all text',
    on: {
      click (data) {
        function updateText (state) {
          if (state.val) {
            const split = state.val.split(' ')
            state.set(split[0] + ' ' + Math.round(Math.random() * 9999))
          }
          state.each(updateText)
        }
        updateText(state)
      }
    }
  },
  toggle: {
    class: 'basic-item',
    text: {
      // completely wrong allready
      $: 'first.text',
      $transform (val) {
        return !val ? 'add first' : 'remove ' + val
      }
    },
    on: {
      click (data) {
        state.set({ first: state.first ? null : { text: 'first' } })
      }
    }
  },
  toggle2: {
    class: 'basic-item',
    text: {
      // completely wrong allready
      $: 'second.text',
      $transform (val) {
        return !val ? 'add second' : 'remove ' + val
      }
    },
    on: {
      click (data) {
        state.set({ second: state.second ? null : { text: 'second' } })
      }
    }
  },
  nocontext: [
    {
      class: 'complex-item',
      symbol: {},
      title: { text: 'no context' },
      first: { $: 'first', class: 'nested', b: { c: { text: { $: 'text' } } } },
      second: { $: 'second', class: 'nested', b: { c: { text: { $: 'text' } } } }
    },
    {
      class: 'complex-item',
      symbol: {},
      title: { text: 'no context' },
      subtitle: { text: 'path subscription' },
      first: { class: 'basic-item', $: 'first.text', text: 'first' },
      second: { class: 'basic-item', $: 'second.text', text: 'second' }
    },
    {
      class: 'complex-item',
      symbol: {},
      title: { text: 'no context' },
      subtitle: { text: 'mixed subscription' },
      first: { class: 'basic-item', $: 'first', text: 'first' },
      second: { class: 'basic-item', $: 'second.text', text: 'second' }
    }
  ],
  basic: [
    { type: 'basic' },
    { type: 'basic' }
  ],
  complex: [
    { type: 'complex' },
    { type: 'complex' },
    { type: 'complex' }
  ],
  deep: [
    { type: 'deep' },
    { type: 'deep' },
    { type: 'deep' }
  ]
}


var subs

document.body.appendChild(render(app, state, (state, type, stamp, nsubs, tree, sType, elem, s, rsubs) => {
  subs = rsubs
  // console.log(
  //   '%cFIRE', 'color: white;background-color: #333; padding: 2px;',
  //   state.path().join('/'), ' - ',
  //   type, ' - ',
  //   sType || 'normal', '\n\n'
  // )
}))

function logger (a) {
  for (var i = 0 ; i < a.length; i += 3) {
    console.log(a[i] + ' : ' + a[i + 2].path().join('/'))
  }
}
console.log(subs)

console.log('tList')
// logger(subs._.tList)

console.log('TOP FIRST TA')
// logger(subs.first._.ta)

state.set({ second: { text: 'second' } })
state.set({ first: { text: 'first' } })

// console.log('----reset first-------')
// state.set({ first: { text: 'haha' } })
// state.set({ rootspawner: {} })

// HAS TO BE DONE BY TMRW!
// ROOT
// {
//   $: 'rootspawner',
//   class: 'complex-item',
//   symbol: {},
//   title: { text: 'no context' },
//   subtitle: { text: 'root subscription' },
//   // now this does nto fire... on remove
//   // and fires one to may after the remove for b
//   first: { class: 'basic-item', $: '$root.a.first', text: 'first' },
//   second: { class: 'basic-item', $: '$root.b.second', text: 'second' }
// }
