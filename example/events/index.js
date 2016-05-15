'use strict'
require('../style.css')
const s = require('vigour-state/s')
const Element = require('../../lib/element')
const render = require('../../lib/render')
const elem = new Element({
  key: 'app',
  holder: {
    $: 'collection',
    $any: true,
    Child: {
      big: {
        node: 'input',
        text: { $: 'title' },
        on: {
          rightclick (data) {
            console.log('click!')
          },
          arrowleft (data) {
            console.log('arrowleft:', data)
          },
          arrowright (data) {
            console.log('arrowright:', data)
          }
        }
      }
    }
  }
})

elem.holder.Child.prototype.big.__on.remove()
// console.log('-->', )

const data = {}
let n = 1

data.collection = {}

while (n--) data.collection[n] = {title: '0'}

const state = s(data)

document.body.appendChild(render(elem, state))
