
module.exports =
{
  val: 'switch',
  _:
  {
    new: (state, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      _1.appendChild(document.createTextNode(`
  hello`))
      var _2 = tree._[2] = document.createElement('div')
      _1.appendChild(_2)
      _2.appendChild(document.createTextNode('bye'))
      _1.appendChild(document.createTextNode(`
`))
    }
  }
}
