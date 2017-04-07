
const C = (({ dirty, dweep = 'pink', durk, x, y }) => {
    return h(
      'div',
      {
        style: {
          color: dweep,
          transform: `translated3d(${x || 0}px, ${y || 0}px, 0px)`
        }
      },
      dirty,
      h('button', { style: { background: 'red' } }, 'boeton'),
      h('h1', { style: { borderTop: '1px solid blue' }, durk }),
      h('ul', null, h('li', null, dirty))
    )
  })

  const $component0xy = (state, type, subs, tree) => {
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
    p.c_0.nodeValue = state.compute() || ''
    p.c_3_0_0.nodeValue = state.compute() || ''
  }

  const $component0dweep = (state, type, subs, tree) => {
    getParent(1, tree).c.style.color = state.compute() || 'pink'
  }

  const $component0 = (state, type, subs, tree) => {
    state = state._p // this is wrong ofc
    if (!tree._) tree._ = {}
    if (type === 'remove') {
      remove(tree._[1])
    } else if (type === 'new') {
      const parent = getParent(0, tree)
      const storage = {}
      const dirty = state.get('dirty', {}).compute()
      const dweep = state.get('dweep', {}).compute() || 'pink'
      const durk = state.get('durk', {}).compute()
      const x = storage._o_0_x = state.get('x', {}).compute() || 0
      const y = storage._o_0_y = state.get('y', {}).compute() || 0
      storage.c_0 = createText(dirty)
      storage.c_2_0 = createText(durk)
      storage.c_3_0_0 = createText(dirty)
      briskyH(
        storage,
        'div',
        'c',
        {
          style: {
            color: dweep,
            transform: `translated3d(${x || 0}px, ${y || 0}px, 0px)`
          }
        },
        [
          storage.c_0,
          briskyH(storage, 'button', 'c_1', { background: 'red' }, [ createText('boeton') ]),
          briskyH(storage, 'h1', 'c_2', { background: 'red' }, [ storage.c_2_0 ]),
          briskyH(storage, 'ul', 'c_3', null, [
            briskyH(storage, 'li', 'c_3_0', null, [ storage.c_3_0_0 ])
          ])
        ]
      )
      tree._[1] = storage
      parent.c.appendChild(storage.c)
    }
  }