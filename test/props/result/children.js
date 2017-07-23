
module.exports =
{
  val: 'switch',
  _:
  {
    new: (state, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      var _2 = tree._[2] = document.createElement('Thing')
      _1.appendChild(_2)
    }
  }
}
