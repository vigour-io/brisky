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
    fragment: {
      $:'thing',
      node: 'fragment',
      text: {
        $: 'txt'
      },
      childthing: {
        class: 'basic-item',
        text: 'im a child!'
      }
    },
    fragment2: {
      $:'thing2',
      node: 'fragment',
      text: {
        $: 'txt'
      },
      childthing: {
        class: 'basic-item',
        text: 'im a child of 2!'
      }
    }
  },
  another: {
    class: 'holder',
    thing: {
      $:'thing',
      text: {
        $: 'txt'
      },
      childthing: {
        class: 'basic-item',
        text: 'im a child!'
      }
    }
  }
}

const state = s({
  thing: {
    txt: 'yay text!'
  },
  thing2: {
    txt: 'yay text 2!'
  }
})

document.body.appendChild(render(elem, state))

// setTimeout(function () {
//   state.thing.remove()
// }, 500)
