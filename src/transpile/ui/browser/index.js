// const include = require('../../include')

module.exports = {
  id: 'browser',
  createElement: (status, id, type) => {
    // type / tag
    // status.functions
    if (id) {
      return `var _${id} = tree._[${id}] = document.createElement('${type}')`
    } else {
      // for non dynamic children (needs to be used)
      return `var _${id} = document.createElement('${type}')`
    }
  },
  removeChild: (status, id, childId) => {
    console.log('removeElement')
  },
  createText: (status, id, parentId, val) => {
    if (id) {
      return `_${parentId}.appendChild((tree._[${id}] = document.createTextNode(${val})))`
    } else {
      return `_${parentId}.appendChild(document.createTextNode(${val}))`
    }
  },
  updateText: (status, id, parentId, val, subs) => {
    var i = subs.length
    var str = 's'
    while (i--) { str += '._p' }
    return `${str}._[${id}].nodeValue = ${val}`
  },
  addChild: (status, id, childId) => {
    // include(status, 'getParent')
    return `_${id}.appendChild(_${childId})`
  }
}
