const getParent = (tree, id) => { //eslint-disable-line
  var p = tree
  while (p) {
    if (p._ && p._[id]) {
      return p._[id]
    }
    p = tree._p
  }
}

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
      _2.appendChild((tree._[3] = document.createTextNode(s.get('field', '').compute().nested)))
      _2.appendChild(document.createTextNode('X'))
      var _4 = tree._[4] = document.createElement('h2')
      _1.appendChild(_4)
      _4.appendChild((tree._[5] = document.createTextNode(s.get('field', '').compute().a.b.c.toUpperCase())))
      var _6 = tree._[6] = document.createElement('h3')
      _1.appendChild(_6)
      _6.appendChild((tree._[7] = document.createTextNode(s.get('field', '').compute())))
    }
  },
  field:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        getParent(tree, 3).nodeValue = s.compute().nested
        getParent(tree, 5).nodeValue = s.compute().a.b.c.toUpperCase()
        getParent(tree, 7).nodeValue = s.compute()
      }
    }
  }
}
