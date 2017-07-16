
module.exports =
{
  val: 'switch',
  _:
  {
    new: (s, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      var _2 = tree._[2] = document.createElement('h1')
      _1.appendChild(_2)
      _2.appendChild(document.createTextNode('X'))
      _2.appendChild((tree._[3] = document.createTextNode(s.get(['field', 'nested'], '').compute())))
      _2.appendChild(document.createTextNode('X'))
      var _4 = tree._[4] = document.createElement('h2')
      _1.appendChild(_4)
      _4.appendChild((tree._[5] = document.createTextNode(s.get(['field', 'a', 'b', 'c'], '').compute().toUpperCase())))
      var _6 = tree._[6] = document.createElement('h3')
      _1.appendChild(_6)
      _6.appendChild((tree._[7] = document.createTextNode(s.get('field', '').compute())))
      var _8 = tree._[8] = document.createElement('h4')
      _1.appendChild(_8)
      _8.appendChild(document.createTextNode('X'))
      _8.appendChild((tree._[9] = document.createTextNode(s.get(['field', 'nested', 'a'], '').compute() + '!' + s.get(['field', 'nested', 'a'], '').compute())))
    }
  },
  field:
  {
    nested:
    {
      val: 'shallow',
      _:
      {
        update: (s, type, subs, tree) => {
          s._p._p._[3].nodeValue = s.compute()
        }
      },
      a:
      {
        val: 'shallow',
        _:
        {
          update: (s, type, subs, tree) => {
            s._p._p._p._[9].nodeValue = s.compute() + '!' + s.compute()
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
          val: 'shallow',
          _:
          {
            update: (s, type, subs, tree) => {
              s._p._p._p._p._[5].nodeValue = s.compute().toUpperCase()
            }
          }
        }
      }
    },
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        s._p._[7].nodeValue = s.compute()
      }
    }
  }
}
