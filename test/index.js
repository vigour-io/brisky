'use strict'
const render = require('../')
const test = require('tape')
const h = require('hub.js')
const { get } = require('brisky-struct')

test('render', t => {

  // ------- this is all compiler -------
  const styles = {}
  const toDash = key => key.replace(/([A-Z])([a-z]|$)/g, '-$1$2').toLowerCase()
  // toDashcan be done by compiler
  var cnt = 0
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
  const style = document.createElement('style')
  // WebKit hack :(
  style.appendChild(document.createTextNode(''))
  document.head.appendChild(style)
  const sheet = style.sheet
  const setStyle = (style, val) => {
    style = toDash(style)
    val = `${style}:${val}`
    if (!styles[val]) {
      const classname = uid(cnt++)
      styles[val] = classname
      sheet.insertRule(`.${classname} { ${val}; }`, sheet.rules.length)
    }
    return styles[val]
  }
  // -----------------------------------

  const getParent = (id, tree) => {
    var p = tree
    while (p) {
      if (p._ && (id in p._)) {
        return p._[id]
      }
      p = p._p
    }
  }

  // --------------------------------
  // compilerstep -- will also work in the browser!
  setStyle('background', 'red')
  setStyle('borderTop', '5px solid blue')
  setStyle('padding', '10px')
  // ---------------------------------

  const $component0x_y = (state, type, subs, tree) => {
    const n = getParent(1, tree)
    if (n.o_0 !== state.stamp) {
      n.o_0 = state.stamp
      n.c.style.transform = `translate3d(${n._o_0_x.compute() || 0}px, ${n._o_0_y.compute() || 0}px, 0px)`
    }
  }

  const $component0durk = (state, type, subs, tree) => {
    getParent(1, tree).c_2_0.nodeValue = state.compute() || ''
  }

  const $component0dirty = (state, type, subs, tree) => {
    const p = getParent(1, tree)
    const val = state.compute()
    p.c_0.nodeValue = val || ''
    p.c_3_0_0.nodeValue = val || ''
  }

  const $component0dweep = (state, type, subs, tree) => {
    getParent(1, tree).c.style.color = state.compute() || 'pink'
  }

  const $component0 = (state, type, subs, tree) => {
    if (type === 'remove') {
      const c = tree._ && tree._[1] && tree._[1].c
      if (c) c.parentNode.removeChild(c)
    } else if (type === 'new') {
      if (!tree._) tree._ = {}
      const parent = getParent(0, tree)
      const storage = tree._[1] = {}

      // ---------------- props will come from parent! ---------
      const dirty = state.get('dirty', {}).compute()
      const dweep = state.get('dweep', {}).compute() || 'pink'
      const durk = state.get('durk', {}).compute()

      storage._o_0_x = state.get('x', {})
      storage._o_0_y = state.get('y', {})
      const x = storage._o_0_x.compute() || 0
      const y = storage._o_0_y.compute() || 0
      // ----------------------------------------------------------

      // ----------------------------- dom ------------------------
      const text0 = storage.c_0 = document.createTextNode(dirty || '')
      const text1 = storage.c_2_0 = document.createTextNode(durk || '')
      const text2 = storage.c_3_0_0 = document.createTextNode(dirty || '')
      const div0 = storage.c = document.createElement('div')
      div0.style.color = dweep // since its state no setStyle
      div0.style.transform = `translated3d(${x || 0}px, ${y || 0}px, 0px)` // since its state no setStyle
      div0.appendChild(text0)
      const button0 = document.createElement('button')
      button0.classList.add('a', 'b', 'c')
      button0.appendChild(document.createTextNode('boeton'))
      div0.appendChild(button0)
      const h10 = document.createElement('h1')
      h10.classList.add('b')
      h10.appendChild(text1)
      div0.appendChild(h10)
      const li0 = document.createElement('li')
      li0.appendChild(text2)
      const ul0 = document.createElement('ul')
      ul0.appendChild(li0)
      div0.appendChild(ul0)
      // ----------------------------------------------------------

      parent.c.appendChild(div0)
    }
  }

  const render = (props) => {
    const tree = { _: { 0: { c: document.body } } }
    // could use parentnode listener or something
    // do need to change ids -- messed up
    hub.subscribe({
      val: 'property', // to handle initial app
      _: { property: [ $component0 ] },
      x: {
        val: 'shallow',
        _: { update: [ $component0x_y ] }
      },
      y: {
        val: 'shallow',
        _: { update: [ $component0x_y ] }
      },
      durk: {
        val: 'shallow',
        _: { update: [ $component0durk ] }
      },
      dirty: {
        val: 'shallow',
        _: { update: [ $component0dirty ] }
      },
      dweep: {
        val: 'shallow',
        _: { update: [ $component0dweep ] }
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