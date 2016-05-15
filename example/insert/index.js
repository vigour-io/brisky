'use strict'
// -------------------------
// for comparable results
// https://github.com/Matt-Esch/virtual-dom/issues/371
// -------------------------
require('../style.css')
const benchmark = require('../benchmark')
const obj = {
  $: 'collection.0'
}
let cnt = 5000
while (cnt--) {
  obj['-' + cnt + '-'] = {
    $: cnt,
    text: {
      $: 'title'
    }
  }
}
benchmark.loop(
  1,
  {
    key: 'app',
    holder: obj
  },
  (i, cnt) => {
    var obj = {}
    // var random = ~~(Math.random() * cnt)
    var random = cnt
    obj[random] = { title: random }
    return obj
  }
)
