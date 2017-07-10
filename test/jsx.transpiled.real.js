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
      _3.appendChild((tree._[4] = document.createTextNode((s.get(['title', 'compute']) || 'fun') + '!')))
    }
  }
}
