'use strict'
require('../style.css')
require('./style.css')

const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')
// -------------------------

const elem = {
  key: 'app',
  holder: {
    $: 'thing',
    components: {
      face: {
        text: 'check it',
        class: {
          components: {
            nameThing: {
              // val: 'my-name'
              $: 'special'
            }
          },
          'other-name': { $: 'one' },
          dont: { $: 'breakme' }
        }
      }
    },
    first: {
      type: 'face'
    },
    second: {
      type: 'face',
      class: {
        thing: { type: 'nameThing' }
      }
    },
    third: {
      type: 'face'
    }
  }
}

const state = s({
  thing:{
    one: true,
    breakme: 'not-this-name',
    special: 'my-name'
  },
})

document.body.appendChild(render(elem, state))
// console.log('\n-------------------------------\n\n')
// state.set({
//   thing:{
//     one: 1,
//     breakme: 'not-this-name'
//   }
// })