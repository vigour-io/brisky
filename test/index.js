'use strict'
const render = require('../')
const test = require('tape')
const h = require('hub.js')
const { puid } = require('brisky-struct')

test('render', t => {
  const hub = h({ dirty: 'its some text', dweep: 'blue' })

  const briskyH = (storage, tag, id, attributes, children) => {
    const elem = document.createElement(tag)
    storage[id] = elem
    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      // here we need to handle
      // other dom nodes
      if (child && typeof child === 'object') {
        if (child.inherits) {
          elem.appendChild((storage[id + '_' + i] = document.createTextNode(child.compute())))
        } else if (child.nodeType) {
          elem.appendChild((storage[id + '_' + i] = child))
        }
      } else if (typeof child === 'string') {
        elem.appendChild(document.createTextNode(child))
      }
    }

    // needs to bind to props!!!!
    if (attributes) {
      for (let attr in attributes) {
        if (attr === 'style') {
          // handle style here
          const styles = attributes[attr]
          for (let key in styles) {
            const style = styles[key]
            if (style && typeof style === 'object' && style.inherits) {
              elem.style[key] = style.compute()
            } else {
              elem.style[key] = style
            }
          }
        }
      }
    }

    return elem
  }

  const getParent = (id, tree) => {
    var p = tree
    while (p) {
      if (p._ && (id in p._)) {
        return p._[id]
      }
      p = p._p
    }
  }

  const remove = (node) => {
    if (node) node.parentNode.removeChild(node)
  }

  const B = (({ dirty, dweep = 'pink' }) => {
    return h('div', { style: { color: dweep } }, dirty)
  })

  const C = (({ dirty, dweep = 'pink', durk }) => {
    return h('div', { style: { color: dweep } },
      dirty,
      h('button', { style: { background: 'red' } }, 'boeton'),
      h('h1', { style: { borderTop: '1px solid blue' }, durk }),
      h('ul', null, h('li', null, dirty))
    )
  })

  const render = (props) => {
    const tree = {}
    hub.subscribe({
      val: 'property', // to handle initial app
      _: {
        property: [
          (state, type, subs, tree) => {
            if (!tree._) tree._ = {}
            if (type === 'remove') {
              remove(tree._[1])
            } else if (type === 'new') {
              const dirty = state.get('dirty', '') // since its bound to text
              const dweep = state.get('dweep', 'pink') // default
              const durk = state.get('durk', '') // since its bound to text

              const storage = {}

              briskyH(
                storage,
                'div',
                'c',
                { style: { color: dweep } },
                [
                  dirty,
                  briskyH(storage, 'button', 'c_1', { background: 'red' }, [ 'boeton' ]),
                  briskyH(storage, 'h1', 'c_2', { background: 'red' }, [ durk ]),
                  briskyH(storage, 'ul', 'c_3', null, [
                    briskyH(storage, 'li', 'c_3_0', null, [ dirty ])
                  ])
                ]
              )

              tree._[1] = storage

              console.log(tree._[1])
            }
          }
        ]
      },
      durk: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => {
              getParent(1, tree).c_2_0.nodeValue = state.compute()
            }
          ]
        }
      },
      dirty: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => {
              getParent(1, tree).c_0.nodeValue = state.compute()
            },
            (state, type, subs, tree) => {
              getParent(1, tree).c_3_0_0.nodeValue = state.compute()
            }
          ]
        }
      },
      dweep: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => {
              getParent(1, tree).c.style.color = state.compute()
            }
          ]
        }
      }
    }, (state, type, subs, tree) => {
      const _ = subs._
      if (_) {
        if (type !== 'update') {
          if (_.property) {
            let i = _.property.length
            while (i--) _.property[i](state, type, subs, tree)
          }
        } else if (_.update) {
          let i = _.update.length
          while (i--) _.update[i](state, type, subs, tree)
        }
      }
    }, true, tree)
    return tree._[1].c
  }

  // render(B, hub)
  document.body.appendChild(render(hub))

  const timeout = i => new Promise(resolve => {
    setTimeout(() => resolve(i), 10)
  })

  hub.set({
    dirty: function * () {
      let i = 1000
      while (i--) { yield timeout(i) }
    }
  })

  let d = Date.now()
  let i = 1
  while (i--) {
    hub.set({
      dweep: i % 2 ? 'orange' : 'purple',
      dirty: i,
      durk: 'durk!'
    })
  }
  console.log(Date.now() - d, 'ms')

  t.end()
})
