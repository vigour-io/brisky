const include = require('../../include')

module.exports = {
  id: 'browser',
  createElement: (status, id, type) => {
    // type / tag
    // status.functions
    return `var _${id} = tree._[${id}] = document.createElement('${type}')`
  },
  removeChild: (status, id, childId) => {
    console.log('removeElement')
  },
  createText: (status, id, parentId, val) => {
    return `_${parentId}.appendChild((tree._[${id}] = document.createTextNode(${val})))`
  },
  updateText: (status, id, parentId, val) => {
    include(status, 'getParent')
    return `getParent(tree, ${id}).nodeValue = ${val}`
  },
  addChild: (status, id, childId) => {
    // include(status, 'fn')
    return `_${id}.appendChild(_${childId})`
  }
}
