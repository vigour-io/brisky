'use strict'
require('../style.css')
const benchmark = require('../benchmark')
const app = {
  key: 'app',
  text: 'collection',
  main: {
    holder1: {
      class: 'holder',
      $: 'collection.$any',
      Child: {
        class: 'basic-item',
        text: { $: 'title' }
      }
    },
    holder2: {
      class: 'holder',
      $: 'collection.$any',
      Child: {
        class: 'complex-item',
        on: {
          remove (val, stamp, node) {
            console.log('FIRE REMOVE:', val, stamp, node)
          }
        },
        symbol: {},
        nested: {
          a: {
            b: {
              img: { caption: { text: 'static img' } }
            }
          }
        },
        title: {
          text: { $: 'title' }
        },
        header: {
          a: {
            bla: {
              x: {
                text: { $: 'x', $prepend: 'x:' }
              },
              lastname: {
                text: {
                  $: 'title.lastname',
                  $prepend: 'lname: '
                }
              }
            },
            text: {
              $: 'title',
              $prepend: 'h:',
              $transform (val) { return val }
            }
          }
        }
      }
    }
  }
}

benchmark.loop(1000, app, (i, cnt) => {
  return {
    title: {
      val: i + cnt,
      lastname: i + cnt
    },
    x: i + cnt
  }
})
