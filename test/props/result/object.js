
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
      _2.appendChild((tree._[3] = document.createTextNode(s.get('bla', '').compute() + '!' + s.get('bla', '').compute() + s.get(['x', 'y', 'z'], '').compute())))
    }
  },
  x:
  {
    y:
    {
      z:
      {
        val: 'shallow',
        _:
        {
          update: (s, type, subs, tree) => {
            s._[3].nodeValue = s.parent(3).get([ 'bla' ]).compute() + '!' + s.parent(3).get([ 'bla' ]).compute() + s.compute()
          }
        }
      }
    }
  },
  bla:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        s._[3].nodeValue = s.compute() + '!' + s.compute() + s.parent(1).get([ 'x', 'y', 'z' ]).compute()
      }
    }
  }
}
