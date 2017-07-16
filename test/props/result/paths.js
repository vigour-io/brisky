
module.exports =
{
  val: 'switch',
  _:
  {
    new: (state, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      var _2 = tree._[2] = document.createElement('h1')
      _1.appendChild(_2)
      _2.appendChild(document.createTextNode('X'))
      _2.appendChild((tree._[3] = document.createTextNode(state.get(['field', 'nested'], '').compute())))
      _2.appendChild(document.createTextNode('X'))
      var _4 = tree._[4] = document.createElement('h2')
      _1.appendChild(_4)
      _4.appendChild((tree._[5] = document.createTextNode(state.get(['field', 'a', 'b', 'c', 'd'], '').compute().toUpperCase())))
      var _6 = tree._[6] = document.createElement('h3')
      _1.appendChild(_6)
      _6.appendChild((tree._[7] = document.createTextNode(state.get('field', '').compute())))
      var _8 = tree._[8] = document.createElement('h4')
      _1.appendChild(_8)
      _8.appendChild(document.createTextNode('X'))
      _8.appendChild((tree._[9] = document.createTextNode(state.get(['field', 'nested', 'a'], '').compute() + '!' + state.get(['field', 'nested', 'a'], '').compute())))
      var _10 = tree._[10] = document.createElement('h5')
      _1.appendChild(_10)
      _10.appendChild((tree._[11] = document.createTextNode(state.get(['field', 'nested', 'a'], '').compute() + state.get(['field', 'x', 'y', 'z'], '').compute())))
    }
  },
  field:
  {
    nested:
    {
      val: 'shallow',
      _:
      {
        update: (state, type, subs, tree) => {
          tree._p._p._[3].nodeValue = state.compute()
        }
      },
      a:
      {
        val: 'shallow',
        _:
        {
          update: (state, type, subs, tree) => {
            tree._p._p._p._[9].nodeValue = state.compute() + '!' + state.compute()
            tree._p._p._p._[11].nodeValue = state.compute() + state.parent(3).get([ 'field', 'x', 'y', 'z' ]).compute()
          }
        }
      }
    },
    a:
    {
      b:
      {
        c:
        {
          d:
          {
            val: 'shallow',
            _:
            {
              update: (state, type, subs, tree) => {
                tree._p._p._p._p._p._[5].nodeValue = state.compute().toUpperCase()
              }
            }
          }
        }
      }
    },
    val: 'shallow',
    _:
    {
      update: (state, type, subs, tree) => {
        tree._p._[7].nodeValue = state.compute()
      }
    },
    x:
    {
      y:
      {
        z:
        {
          val: 'shallow',
          _:
          {
            update: (state, type, subs, tree) => {
              tree._p._p._p._p._[11].nodeValue = state.parent(4).get([ 'field', 'nested', 'a' ]).compute() + state.compute()
            }
          }
        }
      }
    }
  }
}
