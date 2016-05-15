'use strict'
require('../style.css')
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const render = require('../../lib/render')
// -------------------------
const s = require('vigour-state/s')
// -------------------------
const elem = {
  key: 'app',
  components: {
    thingy: {
      nested: {
        text: 'thingy.nested',
        style: {
          transform: {
            rotate: {
              $: 'rotate'
            },
            x: 50,
            y: 100,
            scale: {
              $: 'scale'
            }
          },
          height: { $: 'h' },
          border: '1px solid red'
        }
      }
    }
  },
  first: {
    type: 'thingy',
    $: 'thing'
  },
  second: {
    type: 'thingy',
    $: 'thing2'
  },
  third: {
    type: 'thingy',
    style: {
      transform: {
        scale: 0.5
      }
    }
  },
  coll: {
    $: 'things.$any',
    Child: {
      type: 'thingy'
    }
  }
}

const state = s({
  thing:{
    x:100,
    y:20,
    h: 100,
    rotate: 30
  },
  thing2:{
    h: '400px',
    rotate: 10
  },
  things: {
    0: {
      scale: 1.5
    },
    1: {
      scale: 3
    }
  }
})

document.body.appendChild(render(elem, state))
