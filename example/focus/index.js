'use strict'
require('../style.css')

const s = require('vigour-state/s')
const render = require('../../lib/render')

const elem = {
  key: 'app',
  holder: {
    menu: {
      class: 'complex-item',
      list: {
        $: 'menu.items.$any',
        Child: {
          focus: {
            $: '$parent.$parent.focus'
          },
          text: {
            $: 'title'
          },
          on: {
            arrowup (data) {
              const previous = data.target.previousSibling
              if (previous) { previous.focus() }
            },
            arrowdown (data, stamp) {
              const next = data.target.nextSibling
              if (next) {
                next.focus()
              } else {
                const rootstate = data.state.getRoot()
                rootstate.focus.set(rootstate.episodes.focus, stamp)
                rootstate.episodes.focus.emit('data', stamp)
              }
            }
          }
        }
      }
    },
    secondscreen: {
      $: '$root.focus',
      title: [
        { text: 'Im a secondscreen!' },
        { class: 'complex-item', text: { $: 'title' } }
      ],
      class: {
        val: 'complex-item',
      }
    },
    list: {
      $: 'episodes.items.$any',
      Child: {
        text: {
          $: 'title'
        },
        focus: {
          $: '$parent.$parent.focus'
        },
        on: {
          arrowup (data, stamp) {
            const previous = data.target.previousSibling
            if (previous) { previous.focus() }
           else {
            const rootstate = data.state.getRoot()
            rootstate.focus.set(rootstate.menu.focus, stamp)
            rootstate.menu.focus.emit('data', stamp)
          }
          },
          arrowdown (data) {
            const next = data.target.nextSibling
            if (next) { next.focus() }
          }
        }
      }
    }
  }
}

const state = s({
  title: 'root-title',
  focus: '$root.episodes.focus',
  menu: {
    title: 'im the menu!',
    focus: '$root.menu.items.1',
    items: [
      { title:'discover!' },
      { title:'shows!' },
      { title:'channels!' }
    ]
  },
  episodes: {
    currentEpisode: '$root.episodes.items.1',
    title: 'episodes!',
    focus: '$root.episodes.items.1',
    items: [
      { title:'episode 1' },
      { title:'episode 2' },
      { title:'episode 3' },
      { title:'episode 4 '}
    ]
  }
})

var treex
var topsubs
document.body.appendChild( render(elem, state,
  (state, type, stamp, nsubs, tree, sType, subs, rTree) => {
 treex = rTree
 topsubs = subs
}))

console.log('---------')
console.log('rSubs:', topsubs)
console.log('rTree', treex)
console.log('---------')