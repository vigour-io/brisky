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
      _2.appendChild((tree._[3] = document.createTextNode('!bye' + s.get('hello', '').compute().toUpperCase() + s.get('hello', '').compute().toLowerCase() + 'bye!')))
    }
  },
  hello:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        getParent(tree, 3).nodeValue = '!bye' + s.compute().toUpperCase() + s.compute().toLowerCase() + 'bye!'
      }
    }
  }
}
