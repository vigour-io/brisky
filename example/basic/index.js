'use strict'
// -------------------------
// for comparable results
// https://github.com/Matt-Esch/virtual-dom/issues/371
// -------------------------
const benchmark = require('../benchmark')
require('../style.css')

benchmark.loop(
  25e2,
  {
    key: 'app',
    text: 'basic',
    holder: {
      $: 'collection.$any',
      Child: {
        node: 'span',
        class: 'basic-item',
        text: { $: 'title' } // lookup 2 per thing and then one extra for the parent very very bad
      }
    }
  },
  (i, cnt) => {
    return { title: i + cnt }
  }
)
