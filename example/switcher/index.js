'use strict'
require('../style.css')
const s = require('vigour-state/s')
const render = require('../../lib/render')

const first = {
  holder: {
    class: 'basic-item',
    $: 'navigation.$switch',
    map (state, type, stamp, subs, tree, sType) {
      if (state.key === 'showData') {
        return 'show'
      } else if (state.key === 'discoverData') {
        return 'discover'
      }
    },
    Child: {
      class: 'complex-item'
    },
    properties: {
      show: {
        text: 'Firstscreen Show!',
        title: {
          text: {
            $: 'title'
          }
        },
        holder: {
          $: 'currentEpisode.$switch',
          map: () => 'episode',
          properties: {
            episode: {
              text: {
                $: 'title'
              }
            }
          }
        },
        list: {
          class: 'complex-item',
          holder: {
            class: 'complex-item',
            text: 'episode list:'
          },
          $: 'episodes.$any',
          Child: {
            text:{
              $:'title'
            },
            on: {
              click (data) {
                data.state.lookUp('currentEpisode').set(data.state)
              }
            }
          }
        },
        button: {
          class: 'basic-item',
          text: 'switch episode',
          on: {
            click (data) {
              const navigation = state.first.content.showData.currentEpisode
              const episodes = state.first.content.showData.episodes
              navigation.set(navigation.val === episodes[0]
                ? episodes[1]
                : episodes[0])
            }
          }
        }
      },
      discover: {
        text: 'Firstscreen Discover!',
        title: {
          text: {
            $: 'title'
          }
        }
      }
    }
  }
}

const second = {
  holder: {
    text: { $: 'title' },
    switcher: {
      class: 'complex-item',
      $: 'navigation.$switch',
      map (state, type, stamp, subs, tree, sType) {
        if (state.key === 'showData') {
          return 'show'
        } else if (state.key === 'discoverData') {
          return 'discover'
        }
      },
      Child: {
        class: 'complex-item'
      },
      properties: {
        show: {
          text: 'Second Screen Show!'
        },
        discover: {
          text: 'Second Screen Discover!'
        }
      }
    }
  }
}

const elem = {
  key: 'app',
  modes: {
    $: 'mode.$switch',
    map: (state) => {
      console.log('mode!', state.key)
      return state.key
    },
    properties: { first, second }
  },
  switchpage: {
    class: 'basic-item',
    text: 'switch page',
    on: {
      click () {
        console.log('---switch page----')
        const navigation = state.first.navigation
        navigation.set(navigation.val === state.first.content.showData
          ? '$root.first.content.discoverData'
          : '$root.first.content.showData')
      }
    }
  },
  switchmode: {
    class: 'basic-item',
    text: 'switch mode',
    on: {
      click () {
        console.log('---switch mode----')
        const navigation = state.mode
        navigation.set(navigation.val === state.first
          ? '$root.second'
          : '$root.first')
      }
    }
  }
}

const state = s({
  mode: '$root.first',
  first: {
    title: 'Oh! First?',
    navigation: '$root.first.content.showData',
    content: {
      showData: {
        title: 'awesome show!',
        currentEpisode: '$root.first.content.showData.episodes.0',
        episodes: [
          { title: 'Jersey Mania!' },
          { title: 'Kijken Met Vrienden!' },
          { title: 'Abu Dhabi Live!' },
          { title: 'Ik Vertrek!' }
        ]
      },
      discoverData: {
        title: 'discover it!'
      }
    }
  },
  second: {
    title: 'Yay, second screen!',
    navigation: '$root.first.navigation'
  }
})

var treex
var topsubs
document.body.appendChild( render(elem, state,
  (state, type, stamp, nsubs, tree, sType, subs, rTree) => {
 treex = rTree
 topsubs = subs
}))

console.log('rSubs:', topsubs)
console.log('rTree', treex)

// setTimeout(function () {
//   state.set({

//   })
// })