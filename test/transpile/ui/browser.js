module.exports = {
  createElement: (id, type) => {
    // type / tag
    console.log('createElement', id, type)
    return `var _${id} = tree._[${id}] = document.createElement('${type}')`
  },
  removeChild: (id, childId) => {
    console.log('removeElement')
  },
  createText: (id, val) => {
    console.log('createText')
  },
  updateText: (id, val) => {
    console.log('updateText')
  },
  addChild: (id, childId) => {
    return `_${id}.appendChild(_${childId})`
  }
}
