
module.exports =
{
  val: 'shallow',
  _:
  {
    new: (state, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      var _2 = tree._[2] = document.createElement('h1')
      _1.appendChild(_2)
      _2.appendChild((tree._[3] = document.createTextNode(state.get('nested', '').compute())))
      var _4 = tree._[4] = document.createElement('h2')
      _1.appendChild(_4)
      _4.appendChild((tree._[5] = document.createTextNode(state.compute())))
      var _6 = tree._[6] = document.createElement('div')
      _1.appendChild(_6)
      _6.appendChild((tree._[7] = document.createTextNode(state.get('bla', '').compute() + '!' + state.get('bla', '').compute() + state.get(['x', 'y', 'z'], '').compute())))
      var _8 = tree._[8] = document.createElement('div')
      _1.appendChild(_8)
      _8.appendChild(document.createTextNode('yuzi'))
      _8.appendChild((tree._[9] = document.createTextNode(state.get(['bla', 'bax'], '').compute() + '!' + state.get('blurf', '').compute() + state.get(['x', 'y', 'z'], '').compute())))
      var _10 = tree._[10] = document.createElement('div')
      _1.appendChild(_10)
      _10.appendChild((tree._[11] = document.createTextNode(state.get(['bla', 'bla', 'bla'], '').compute().toUpperCase())))
    },
    update: (state, type, subs, tree) => {
      tree._[5].nodeValue = state.compute()
    }
  },
  nested:
  {
    val: 'shallow',
    _:
    {
      update: (state, type, subs, tree) => {
        tree._p._[3].nodeValue = state.compute()
      }
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
            tree._p._p._p._[7].nodeValue = state.parent(3).get([ 'bla' ]).compute() + '!' + state.parent(3).get([ 'bla' ]).compute() + state.compute()
            tree._p._p._p._[9].nodeValue = state.parent(3).get([ 'bla', 'bax' ]).compute() + '!' + state.parent(3).get([ 'blurf' ]).compute() + state.compute()
          }
        }
      }
    }
  },
  bla:
  {
    val: 'shallow',
    _:
    {
      update: (state, type, subs, tree) => {
        tree._p._[7].nodeValue = state.compute() + '!' + state.compute() + state.parent(1).get([ 'x', 'y', 'z' ]).compute()
      }
    },
    bax:
    {
      val: 'shallow',
      _:
      {
        update: (state, type, subs, tree) => {
          tree._p._p._[9].nodeValue = state.compute() + '!' + state.parent(2).get([ 'blurf' ]).compute() + state.parent(2).get([ 'x', 'y', 'z' ]).compute()
        }
      }
    },
    bla:
    {
      bla:
      {
        val: 'shallow',
        _:
        {
          update: (state, type, subs, tree) => {
            tree._p._p._p._[11].nodeValue = state.compute().toUpperCase()
          }
        }
      }
    }
  },
  blurf:
  {
    val: 'shallow',
    _:
    {
      update: (state, type, subs, tree) => {
        tree._p._[9].nodeValue = state.parent(1).get([ 'bla', 'bax' ]).compute() + '!' + state.compute() + state.parent(1).get([ 'x', 'y', 'z' ]).compute()
      }
    }
  }
}
