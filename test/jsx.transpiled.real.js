const { findParent } = require('./framework')

module.exports =
{
  val: 'switch',
  _:
  {
    new: (s, type, subs, tree) => {
      if (!tree._) tree._ = {}
      var $1 = document.createElement('div')
// Thing
      var $2 = document.createElement('h2')
      var $3 = tree._[3] = document.createTextNode('👖' + s.get('title', '').compute() + '👖')
      $2.appendChild($3)
      var $4 = tree._[4] = document.createTextNode('👕' + s.get('flups', '').compute() + '👕')
      $2.appendChild($4)
// Poop
      var $5 = document.createElement('p')
      var $6 = tree._[6] = document.createTextNode(('👕' + s.get('flups', '').compute() + '👕') + '🎩')
      $5.appendChild($6)
// ----------
      $2.appendChild($5)
// ----------
      $1.appendChild($2)
// Sheit
      var $7 = document.createElement('section')
      var $8 = document.createElement('button')
      var $9 = document.createTextNode('HELLO')
      $8.appendChild($9)
      $7.appendChild($8)
// ----------
      $1.appendChild($7)
// Sheit
      var $10 = document.createElement('section')
      var $11 = document.createElement('button')
      var $12 = document.createTextNode('bye')
      $11.appendChild($12)
      $10.appendChild($11)
// ----------
      $1.appendChild($10)
// Sheit
      var $13 = document.createElement('section')
      var $14 = tree._[14] = document.createTextNode('ha!')
      $13.appendChild($14)
      var $15 = document.createElement('button')
      var $16 = document.createTextNode('barf')
      $15.appendChild($16)
      $13.appendChild($15)
// ----------
      $1.appendChild($13)
      tree._[1] = $1 // component
    }
  },
  title:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        findParent(tree, 3).nodeValue = '👖' + s.compute() + '👖'
      }
    }
  },
  flups:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        findParent(tree, 4).nodeValue = '👕' + s.compute() + '👕'
        findParent(tree, 6).nodeValue = ('👕' + s.compute() + '👕') + '🎩'
      }
    }
  },
  undefined:
  {
    val: 'shallow',
    _:
    {
      update: (s, type, subs, tree) => {
        findParent(tree, 14).nodeValue = 'ha!'
      }
    }
  }
}
