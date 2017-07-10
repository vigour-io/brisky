// collect components
const { walker } = require('./util')

exports.collect = ast => {
  const components = {}

  for (let i = 0; i < ast.body.length; i++) {
    const node = ast.body[i]
    if (node.type === 'VariableDeclaration') {
      let isElem
      // check if there is an element inside
      walker(node, node => {
        if (node.type === 'JSXElement') {
          isElem = true
          return true
        }
      })
      if (isElem) {
        // need less restrictive - only for vars now
        components[node.declarations[0].id.name] = node.declarations[0].init
      }
    }
  }

  return components
}
