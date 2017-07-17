
module.exports =
{
  val: 'switch',
  _:
  {
    new: (state, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var _1 = tree._[1] = document.createElement('div')
      var _2 = tree._[2] = document.createElement('h1')
      _1.appendChild(_2)
      _2.appendChild(document.createTextNode('X'))
      _2.appendChild((tree._[3] = document.createTextNode('!bye' + (state.get('title', '').compute() || 'fun') + state.get('hello', '').compute()() + state.get('hello', '').compute()() + 'bye!')))
      _2.appendChild(document.createTextNode('X'))
    }
  },
  hello:
  {
    val: 'shallow',
    _:
    {
      update: (state, type, subs, tree) => {
        tree._p._[3].nodeValue = '!bye' + (state.parent(1).get([ 'title' ]).compute() || 'fun') + state.compute()() + state.compute()() + 'bye!'
      }
    }
  },
  title:
  {
    val: 'shallow',
    _:
    {
      update: (state, type, subs, tree) => {
        tree._p._[3].nodeValue = '!bye' + (state.compute() || 'fun') + state.parent(1).get([ 'hello' ]).compute()() + state.parent(1).get([ 'hello' ]).compute()() + 'bye!'
      }
    }
  }
}
