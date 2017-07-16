
module.exports =
{
  val: 'switch',
  _:
  {
    new: (s, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      var _2 = tree._[2] = document.createElement('div')
      _1.appendChild(_2)
      _2.appendChild((tree._[3] = document.createTextNode(s.get('bla', '').compute() + '!' + s.get('blurf', '').compute())))
    }
  }
}
