const render = (s, type, subs, tree) => {
  if (subs._) {
    if (type === 'new' && subs._.new) {
      if (!tree._) tree._ = {}
      subs._.new(s, type, subs, tree)
    } else if (type === 'update') {
      subs._.update(s, type, subs, tree)
    } else if (type === 'remove') {
      // not there yet
    }
  }
}

const findParent = (tree, id) => {
  var p = tree
  while (p) {
    if (p._ && p._[id]) {
      return p._[id]
    }
    p = tree._p
  }
}

exports.findParent = findParent
exports.render = render
