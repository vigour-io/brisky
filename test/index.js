'use strict'
const render = require('../')
const test = require('tape')
const h = require('hub.js')
const { get, compute } = require('brisky-struct')

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
      if (p._ && (id in p._)) {
        return p._[id]
      }
      p = p._p
    }
  }

  const isStruct = t => t && typeof t === 'object' && t.inherits

  const calc = t => typeof t === 'object' ? compute(t) : t

  // -----------------------------------
  // ------ results --------

  const $component0x_y = (id, state, tree) => {
    const n = getParent(id, tree)
    if (n.o_0 !== state.stamp) {
      n.o_0 = state.stamp
      n.c.style.transform = `translate3d(${calc(n._o_0_x) || 0}px, ${calc(n._o_0_y) || 0}px, 0px)`
    }
  }

  const $component0durk = (id, state, tree) => {
    getParent(id, tree).c_2_0.nodeValue = compute(state) || ''
  }

  const $component0dirty = (id, state, tree) => {
    const p = getParent(id, tree)
    const val = compute(state)
    p.c_0.nodeValue = val || ''
    p.c_3_0_0.nodeValue = val || ''
  }

  const $component0dweep = (id, state, tree) => {
    getParent(id, tree).c.style.color = compute(state) || 'pink'
  }

  const $component0 = (parentId, id, state, type, tree) => {
    if (type === 'remove') {
      const c = tree._ && tree._[id] && tree._[id].c
      if (c) c.parentNode.removeChild(c)
    } else if (type === 'new') {
      if (!tree._) tree._ = {}
      const parent = getParent(parentId, tree)
      const storage = tree._[id] = {}

      // ---------------- THIS IS DIFFERENT FOR USAGE ---------
      const props = parent.$component0

      const dirty = calc(props.dirty)
      const dweep = calc(props.dweep) || 'pink'
      const durk = calc(props.durk)

      if (isStruct(props.x) || isStruct(props.y)) {
        storage._o_0_x = props.x
        storage._o_0_y = props.y
      }
      const x = calc(storage._o_0_x) || 0
      const y = calc(storage._o_0_y) || 0
      // ----------------------------------------------------------

      // ----------------------------- ELEMENTS ------------------------
      const text0 = storage.c_0 = document.createTextNode(dirty || '')
      const text1 = storage.c_2_0 = document.createTextNode(durk || '')
      const text2 = storage.c_3_0_0 = document.createTextNode(dirty || '')
      const div0 = storage.c = document.createElement('div')
      div0.appendChild(text0)
      const button0 = document.createElement('button')
      button0.appendChild(document.createTextNode('boeton'))
      div0.appendChild(button0)
      const h10 = document.createElement('h1')
      h10.appendChild(text1)
      div0.appendChild(h10)
      const li0 = document.createElement('li')
      li0.appendChild(text2)
      const ul0 = document.createElement('ul')
      ul0.appendChild(li0)
      div0.appendChild(ul0)
      // ----------------------------STYLE -------------------------
      div0.classList.add(
        style('transform', `translated3d(${x || 0}px, ${y || 0}px, 0px)`),
        style('color', dweep)
      )

      button0.classList.add(
        style('background', 'red'),
        style('borderTop', '5px solid blue'),
        style('padding', '10px')
      ) // literals / straight vars just get transpiled to letters

      h10.classList.add(style('borderTop', '5px solid blue'))
      // ----------------------------------------------------------

      if (parent.c) parent.c.appendChild(div0)
    }
  }

  const render = (props) => {
    const tree = { _: {
      root: {
        c: document.body,
        $component0: {
          dirty: props.get('dirty', {}),
          dweep: props.get('durk', {}),
          durk: props.get('durk', {}),
          x: props.get('x', {}),
          y: props.get('y', {})
        }
      }
    } }
    // could use parentnode listener or something
    // do need to change ids -- messed up
    hub.subscribe({
      val: 'property', // to handle initial app
      _: { property: [
        (state, type, subs, tree) => $component0('root', 0, state, type, tree)
      ] },
      x: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => $component0x_y(0, state, tree)
          ]
        }
      },
      y: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => $component0x_y(0, state, tree)
          ]
        }
      },
      durk: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => $component0durk(0, state, tree)
          ]
        }
      },
      dirty: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => $component0dirty(0, state, tree)
          ]
        }
      },
      dweep: {
        val: 'shallow',
        _: {
          update: [
            (state, type, subs, tree) => $component0dweep(0, state, tree)
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

    return tree._ && tree._[1] && tree._[1].c
  }

  const hub = h({ field: {} })

  render(hub)
  // render(B, hub, domNode) // taking over a domNode need to add
  // add resolve as well
  // render to node (string as well)
  // just use h for that
  // --------- updates -----
  const timeout = val => new Promise(resolve => {
    setTimeout(() => resolve(val), 10)
  })

  hub.set(function * () {
    let i = 1000
    while (i--) {
      yield timeout({
        dirty: i,
        y: Math.sin(i / 50) * (200 + i / 20) + 200,
        x: Math.cos(i / 50) * (200 + i / 20) + 200
      })
    }
  })

  let i = 1
  while (i--) {
    hub.set({
      dweep: i % 2 ? 'orange' : 'purple',
      dirty: i,
      durk: 'durk!',
      bla: {}
    })
  }

  // let d = Date.now()
  // i = 1e5
  // while (i--) {
  //   hub.set({
  //     x: i,
  //     y: i
  //   })
  // }
  // console.log(Date.now() - d, 'ms')

  // i = 1e4
  // while (i--) {
  //   hub.set({
  //     field: i % 2 ? null : {}
  //   })
  // }
  // console.log(Date.now() - d, 'ms')

  t.end()
})

/*
  const B = (({ dirty, dweep = 'pink' }) => {
    return h('div', { style: { color: dweep } }, dirty)
  })

  // transform is a bit more tricky --- do it later for now just update 3 times
  // later add bs.on()

  // maybe put events in attr?
  const C = (({ dirty, dweep = 'pink', durk, x, y }) => {
    return h(
      'div',
      {
        style: {
          color: dweep,
          transform: `translated3d(${x || 0}px, ${y || 0}px, 0px)`
        },
        onClick: () => dirty.set(Math.random())
        // onRender: () => {},
        // onRemove: () => {}
      },
      dirty,
      h('button', { style: { background: 'red' } }, 'boeton'),
      h('h1', { style: { borderTop: '1px solid blue' }, durk }),
      h('ul', null, h('li', null, dirty))
    )
  })
*/

  // const $component0 = (state, type, subs, tree) => {
  //   state = state._p // this is wrong ofc
  //   if (!tree._) tree._ = {}
  //   if (type === 'remove') {
  //     remove(tree._[1])
  //   } else if (type === 'new') {
  //     const parent = getParentr(0, tree)
  //     const storage = tree._[1] = {}
  //     const dirty = state.get('dirty', {}).compute()
  //     const dweep = state.get('dweep', {}).compute() || 'pink'
  //     const durk = state.get('durk', {}).compute()
  //     const x = storage._o_0_x = state.get('x', {}).compute() || 0
  //     const y = storage._o_0_y = state.get('y', {}).compute() || 0
  //     storage.c_0 = createText(dirty)
  //     storage.c_2_0 = createText(durk)
  //     storage.c_3_0_0 = createText(dirty)
  //     storage.c = createElement(
  //       'div',
  //       {
  //         style: {
  //           color: dweep,
  //           transform: `translated3d(${x || 0}px, ${y || 0}px, 0px)`
  //         }
  //       },
  //       [
  //         storage.c_0,
  //         createElement('button', { style: { background: 'red' } }, [ createText('boeton') ]),
  //         createElement('h1', { style: { background: 'red' } }, [ storage.c_2_0 ]),
  //         createElement('ul', null, createElement('li', null, [ storage.c_3_0_0 ]))
  //       ]
  //     )
  //     parent.c.appendChild(storage.c)
  //   }
  // }

// this is obivously fastest but slower initial since everything will be double...
  // const $component0Button = document.createElement('button')
  // $component0Button.style.background = 'red'
  // $component0Button.appendChild(document.createTextNode('boeton'))
  // const $componenth10 = document.createElement('h1')
  // $componenth10.style.background = 'red'