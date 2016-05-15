'use strict'
require('../style.css')
const render = require('../../lib/render')
const state = { collection: {} }
const amount = 4

for (var i = 0; i < amount; i++) {
  state.collection[i] = {
    x: i,
    y: i * 2,
    title: i
  }
}

const app = {
  key: 'app',
  // x: {
    $: 'collection.$any',
    Child: {
      text: { $: 'title', $prepend: 'child:' }
      // coordinates: {
      //   type: 'group',
      //   render (state) {
      //     console.log('fire coordinates -->', this.inspect(), state.path())
      //     console.log('-----------------------')
      //   },
      //   x: {
      //     $: 'x',
      //     render (state) {
      //       console.log('fire x -->', state && state.inspect())
      //     }
      //   },
      //   y: {
      //     $: 'y',
      //     render (state) {
      //       console.log('fire y -->', state && state.inspect())
      //     }
      //   }
      // }
    }
  // }
}

document.body.appendChild(render(app, state))
