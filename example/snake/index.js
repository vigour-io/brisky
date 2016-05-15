'use strict'
require('../style.css')
require('./style.css')
const benchmark = require('../benchmark')

benchmark.loop(
  250,
  {
    key: 'app',
    holder1: {
      $: 'collection.$any',
      Child: {
        class: 'snake-dot',
        field: { text: 'snake' },
        style: {
          transform: {
            y: { $: 'y' },
            x: { $: 'x' },
            rotate: { $: 'i' }
          }
        }
      }
    }
  },
  (i, cnt) => {
    var val = i + cnt
    val /= 5
    return {
      i: cnt / 2,
      x: Math.sin(val / 5 + cnt / 80) * 400 +
        i * 0.3 + 500 +
        Math.cos(val + cnt / (40 - i / 1000)) * 10,
      y:
        Math.cos(val / 10) * 400 +
        i * 0.3 + 500 +
        Math.sin(val + cnt / (40 - i / 1000)) * 10
    }
  }
)
