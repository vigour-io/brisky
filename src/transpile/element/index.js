const { showcode, walker, merge } = require('../util')
const { getListeners } = require('./subscription')
const { parseExpressionContainer, plainText } = require('./expression/container')
/*
implement these in the framework (Primitives)
View, Text, Image
*/
const { parseArgs } = require('./props')

const createElement = (status, child) => {
  const type = child.type
  if (type === 'JSXOpeningElement') {
    const type = child.name && child.name.name
    const listeners = getListeners(status, 'new')
    const id = ++status.id
    const line = status.ui.createElement(status, id, type, listeners)
    if (line) listeners.push(line)
    return id
  }
}

const addElement = (status, id, childId) => {
  const listeners = getListeners(status, 'new')
  const line = status.ui.addChild(status, id, childId, listeners)
  if (line) listeners.push(line)
}

const createAndAdd = (status, child, parentId) => {
  const id = createElement(status, child)
  if (id) {
    child.id = id
    addElement(status, (child.parent && child.parent.id) || parentId, id)
  }
  return id
}

const parseJSXElement = (status, node) => {
  // status.args
    // type === 'empty'
    // type === 'ObjectPattern'
    // type === 'Identifier'
  const openingElement = node.openingElement
  if (openingElement.id) openingElement.id = false // nodes are re-used so need to become false
  const parentId = createElement(status, openingElement)
  const children = node.children

  walker(children, child => {
    createAndAdd(status, child, parentId)
    parseExpressionContainer(status, child)
    plainText(status, child)
    // parseAttributes(status, child, parentId)
  })
  return parentId
}

exports.parseElement = (status, node) => {
  const type = node.type
  if (type === 'ArrowFunctionExpression' || type === 'FunctionExpression') {
    // there is more difference ofc
    // this is an actual component
    // collect top jsx elements
    // parse if statement
    if (node.body.type === 'BlockStatement') {
      var results = {}
      node.body.body.forEach(child => {
        const type = child.type
        if (type === 'ReturnStatement') {
          if (child.argument.type === 'JSXElement') {
            results.straightReturnJSX = child.argument
            // 'got a block with a jsx element returned'
            // { return <div /> }
          }
        } else if (type === '') {
          // if statements (walk the if statements as well)
        }
      })
    }

    // no switch, straightReturnJSX
    if (!results.switch && results.straightReturnJSX) {
      parseJSXElement(
        merge(status, { args: parseArgs(status, node) }),
        results.straightReturnJSX
      )
    }
  } else if (type === 'JSXElement') {
    // here you dont need to parse the args at all
    // find jsx element else there is switch / any involved
    parseJSXElement(
      merge(status, { args: status.args || { type: 'Empty' } }),
      node
    )
  } else {
    console.log('parseElement: cannot parse node as element!')
    showcode(status.code, node)
  }
}
