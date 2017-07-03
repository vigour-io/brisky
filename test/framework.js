const { compute } = require('brisky-struct')

const getParent = (id, tree) => {
  var p = tree
  while (p) {
    if (p._ && (id in p._)) return p._[id]
    p = p._p
  }
}

const isStruct = t => t && typeof t === 'object' && t.inherits

const calc = t => typeof t === 'object' ? compute(t) : t

const remove = (tree, id) => {
  const c = tree._ && tree._[id] && tree._[id].c
  if (c) c.parentNode.removeChild(c)
}

/*
- add / remove subs dynamicly (on mount component idea)
- make functions to determine if

*/

const render = (component, state, element) => {
  // taking over element is a bit harder
  // component needs to create the app handle
  return component.create(state)
}

exports.remove = remove
exports.calc = calc
exports.isStruct = isStruct
exports.getParent = getParent
