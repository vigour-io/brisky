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
      var _2 = tree._[2] = document.createElement('p')
      _1.appendChild(_2)
      var _3 = tree._[3] = document.createElement('h1')
      _1.appendChild(_3)
      _3.appendChild((tree._[4] = document.createTextNode('!' + (s.get(['title', 'compute']) || 'fun').toUpperCase() + '!')))
    }
  },
  title:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        getParent(tree, 4).nodeValue = '!' + (s.compute() || 'fun').toUpperCase() + '!'
      }
    }
  }
}
