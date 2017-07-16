
module.exports =
{
  val: 'shallow',
  _:
  {
    new: (s, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      var _2 = tree._[2] = document.createElement('h1')
      _1.appendChild(_2)
      _2.appendChild((tree._[3] = document.createTextNode(s.get('nested', '').compute())))
      var _4 = tree._[4] = document.createElement('h2')
      _1.appendChild(_4)
      _4.appendChild((tree._[5] = document.createTextNode(s.get([], '').compute())))
      var _6 = tree._[6] = document.createElement('div')
      _1.appendChild(_6)
      _6.appendChild((tree._[7] = document.createTextNode(s.get('bla', '').compute())))
    },
    update: (s, type, subs, tree) => {
      s._[5].nodeValue = s.compute()
    }
  },
  nested:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        s._p._[3].nodeValue = s.compute()
      }
    }
  },
  bla:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        s._p._[7].nodeValue = s.compute()
      }
    }
  }
}
