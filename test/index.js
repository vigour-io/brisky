'use strict'
const render = require('../')
const test = require('tape')
const h = require('hub.js')
const { compute } = require('brisky-struct')

test('render', t => {

  // ----------------------------
  var cnt = 0
  const styles = {}
  const toDash = key => key.replace(/([A-Z])([a-z]|$)/g, '-$1$2').toLowerCase()
  const uid = num => {
    const div = num / 26 | 0
    var str = String.fromCharCode(97 + num % 26)
    if (div) {
      if (div / 26 | 0) {
        str = str + uid(div)
      } else {
        str = str + String.fromCharCode(97 + div % 26)
      }
    }
    return str
  }
  // add an id for ssr
  const styleSheet = document.createElement('style')
  // WebKit hack :(
  styleSheet.appendChild(document.createTextNode(''))
  document.head.appendChild(styleSheet)
  const sheet = styleSheet.sheet

  const style = (style, val) => {
    const key = style + val
    if (!(key in styles)) {
      const classname = uid(cnt++)
      styles[key] = classname
      sheet.insertRule(`.${classname} { ${toDash(style)}:${val}; }`, sheet.rules.length)
      return classname
    } else {
      return styles[key]
    }
  }
  // ----------------------------

  const getParent = (id, tree) => {
    var p = tree
    while (p) {
      if (p._ && (id in p._)) return p._[id]
      p = p._p
    }
  }

  const isStruct = t => t && typeof t === 'object' && t.inherits

  const calc = t => typeof t === 'object' ? compute(t) : t

  const remove = (tree, id) => {
    const c = tree._ && tree._[id] && tree._[id].c
    if (c) c.parentNode.removeChild(c)
  }

  // -----------------------------------
  // ------ results --------
  // prop-x state
  // prop-y state
  const $component0x_y = (id, state, tree) => {
    const n = getParent(id, tree)
    if (n.o_0 !== state.stamp) {
      n.o_0 = state.stamp
      n.c.style.transform = `translate3d(${calc(n._o_0_x) || 0}px, ${calc(n._o_0_y) || 0}px, 0px)`
    }
  }

  // prop-durk state
  const $component0durk = (id, state, tree) => {
    getParent(id, tree).c_2_0.nodeValue = compute(state)
  }

  // prop-dirty state
  const $component0dirty = (id, state, tree) => {
    const p = getParent(id, tree)
    const val = compute(state)
    p.c_0.nodeValue = val
    p.c_3_0_0.nodeValue = val
  }

  // prop-dweep state
  const $component0dweep = (id, state, tree) => {
    getParent(id, tree).c.style.color = compute(state) || 'pink'
  }

  // render
  const $component0 = (parentId, id, state, type, tree) => {
    if (type === 'remove') {
      remove(tree, id)
    } else if (type === 'new') {
      // also need to check if youre top dog then just add it and set everything else except creation
      if (!tree._) tree._ = {}
      const parent = getParent(parentId, tree)
      const storage = tree._[id] || (tree._[id] = {})
      const props = parent[id] || {}

      // ---------------- PROPS ---------
      const dirty = calc(props.dirty)
      const dweep = calc(props.dweep) || 'pink'
      const durk = calc(props.durk)
      if (isStruct(props.x) || isStruct(props.y)) {
        storage._o_0_x = props.x
        storage._o_0_y = props.y
      }
      const x = calc(storage._o_0_x || props.x) || 0
      const y = calc(storage._o_0_y || props.y) || 0
      // ----------------------------------------------------------

      // ----------------------------- ELEMENTS ------------------------
      // correct order

      /*
       ({ dirty, dweep = 'pink', durk, x, y }) =>
        <div style={{
          color: dweep,
          transform: `translated3d(${x || 0}px, ${y || 0}px, 0px)`
        }}>
        dirty
        <button style={{ style: { background: 'red' }}}>boeton</button>
        <h1 style={{ borderTop: '1px solid blue' }}>durk</h1>
        <ul>
          <li>
            dirty
          </li>
        </ul>
        </div>
      */

      const component = storage.c || (storage.c = document.createElement('div'))
      const text0 = storage.c_0 = document.createTextNode(dirty || '')
      const text1 = storage.c_2_0 = document.createTextNode(durk || '')
      const text2 = storage.c_3_0_0 = document.createTextNode(dirty || '')
      component.appendChild(text0)
      const button0 = document.createElement('button')
      button0.appendChild(document.createTextNode('boeton'))
      component.appendChild(button0)
      const h10 = document.createElement('h1')
      h10.appendChild(text1)
      component.appendChild(h10)
      const li0 = document.createElement('li')
      li0.appendChild(text2)
      const ul0 = document.createElement('ul')
      ul0.appendChild(li0)
      component.appendChild(ul0)
      // ----------------------------STYLE -------------------------

      component.classList.add(
        style('transform', `translate3d(${x}px, ${y}px, 0px)`),
        style('color', dweep),
        style('width', '175px'),
        style('height', '175px')
      )

      button0.classList.add(
        style('background', 'red'),
        style('borderTop', '5px solid blue'),
        style('padding', '10px')
      ) // literals / straight vars just get transpiled to letters

      h10.classList.add(style('borderTop', '5px solid blue'))
      // ----------------------------------------------------------

      if (parent.c) parent.c.appendChild(component)
    }
  }

  // -----------------------------------

  const render = (props) => {
    const tree = { _: {
      root: {
        c: document.body,
        0: { // component 0 (id)
          dirty: props.get('dirty', {}),
          dweep: props.get('dweep', {}),
          durk: props.get('durk', {}),
          x: props.get('x', {}),
          y: props.get('y', {})
        },
        1: { // component 1 (id)
          dirty: 'diry!',
          durk: 'durky dirty',
          x: 100,
          y: 300
        },
        2: { // component 1 (id)
          y: 400,
          dirty: props.get('dirty', {}),
          dweep: 'green'
        }
        // props with an element next level :D
      }
    } }
    // could use parentnode listener or something
    // do need to change ids -- messed up
    hub.subscribe({
      val: 'property', // to handle initial app
      _: {
        property: (state, type, subs, tree) => {
          $component0('root', 0, state, type, tree)
          // let i = 1e4
          // while (i-- > 100) {
            // $component0('root', 100, state, type, tree)
          // }
        }
      },
      blarrrf: {
        val: 'shallow',
        _: {
          property: (state, type, subs, tree) => {
            $component0('root', 1, state, type, tree)
            $component0('root', 2, state, type, tree)
          }
        },
        parent: {
          dirty: {
            val: 'shallow',
            _: {
              update: (state, type, subs, tree) => {
                $component0dirty(2, state, tree)
              }
            }
          }
        }
      },
      x: {
        val: 'shallow',
        _: {
          update: (state, type, subs, tree) => {
            $component0x_y(0, state, tree)
          }
        }
      },
      y: {
        val: 'shallow',
        _: {
          update: (state, type, subs, tree) => {
            $component0x_y(0, state, tree)
          }
        }
      },
      durk: {
        val: 'shallow',
        _: {
          update: (state, type, subs, tree) => {
            $component0durk(0, state, tree)
          }
        }
      },
      dirty: {
        val: 'shallow',
        _: {
          update: (state, type, subs, tree) => {
            $component0dirty(0, state, tree)
          }
        }
      },
      dweep: {
        val: 'shallow',
        _: {
          update: (state, type, subs, tree) => {
            $component0dweep(0, state, tree)
          }
        }
      }
    }, (state, type, subs, tree) => {
      if (subs._) {
        const _ = subs._
        if (type !== 'update') {
          if (_.property) _.property(state, type, subs, tree)
        } else if (_.update) {
          _.update(state, type, subs, tree)
        }
      }
    }, true, tree)

    // need to know where the first boy is
    return tree._ && tree._[1] && tree._[1].c
  }

  const hub = h({
    durk: '!!!!!!!!',
    dweep: 'purple',
    y: 100,
    dirty: 100,
    a: {
      b: true
    }
  })

  console.log(hub.a.b.path())

  const timeout = val => new Promise(resolve => {
    setTimeout(() => resolve(val), 10)
  })

  // hub.set(function * () {
  //   let i = 1000
  //   while (i--) {
  //     yield timeout({
  //       dirty: i,
  //       y: Math.sin(i / 50) * (200 + i / 20) + 200,
  //       x: Math.cos(i / 50) * (200 + i / 20) + 200
  //     })
  //   }
  // })

  var d = Date.now()
  render(hub)
  console.log('RENDER', Date.now() - d, 'ms', document.getElementsByTagName('*').length, 'domNodes')
  hub.set({ blarrrf: true })
  t.end()
})
