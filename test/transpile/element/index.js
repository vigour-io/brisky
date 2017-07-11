const { showcode, walker, string, merge } = require('../util')
const { createPropFromExpression } = require('./expression')

/*
implement these in the framework
View, Text, Image ?
*/
const { parseArgs, parseProps } = require('./props')

var cnt = 0

const getListeners = ({ subs }, type) => {
  if (!subs._) subs._ = {}
  if (!subs._[type]) subs._[type] = []
  return subs._[type]
}

const createElement = (status, child) => {
  const type = child.type
  if (type === 'JSXOpeningElement') {
    const type = child.name && child.name.name
    const listeners = getListeners(status, 'new')
    const id = ++cnt
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

const parseExpressionContainer = (status, node, props, args) => {
  if (node.type === 'JSXExpressionContainer') {
    const prop = createPropFromExpression(
      status, node.expression, props, args
    )
    console.log('prop:', prop)
    if (prop.type === 'struct') {
      console.log('go parse prop')
      // const update = getListeners(status, 'update')
      const listeners = getListeners(status, 'new')
      const id = ++cnt
      let newValue
      // , updateValue
      if (prop.expression.type === 'inline') {
        newValue = prop.expression.val.replace(
          prop.key,
          // compute has to return nothing by default
          `s.get([${prop.val.map(string).join(',')}, 'compute'])`
          // addElement
        )
      }
      const parentId = node.parent.openingElement.id
      const line = status.ui.createText(status, id, parentId, newValue, listeners)
      if (line) listeners.push(line)
    } else if (prop.type === 'raw') {

    } else if (prop.type === 'child') {

    } else if (prop.type === 'reference') {

    }
  }
}

const parseJSXElement = (status, node) => {
  // status.args
    // type === 'empty'
    // type === 'ObjectPattern'
    // type === 'Identifier'
  // status.props
  // if !props all is subscription, also need to get subscription path so you know where you are
  // add it on status

  const openingElement = node.openingElement
  if (openingElement.id) openingElement.id = false // nodes are re-used so need to become false
  const parentId = createElement(status, openingElement)
  const children = node.children
  // als here need to check for parentId
  // if first -- do shit
  walker(children, child => {
    createAndAdd(status, child, parentId)
    parseExpressionContainer(status, child)
  })
  // nested functions for events and any for example
  return parentId
}

exports.parseElement = (status, node, props, args) => {
  // { subs, functions, components, code }
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
          // if statements are the biggest
          // walk if statements
        }
      })

      // no switch and straight
      if (!results.switch && results.straightReturnJSX) {
        // results.straightReturnJSX
        console.log('results.straightReturnJSX')
        // if subs change need to pass own status object
        parseJSXElement(
          merge(status, { props, args: parseArgs(status, node) }),
          results.straightReturnJSX
        )
      }
    }
    // parseJSXElement(status, node, props, parseArgs(status, node))
    // only difference is that we now need to parse the args
    // node.params
  } else if (type === 'JSXElement') {
    // here you dont need to parse the args at all
    // find jsx element else there is switch / any involved
    parseJSXElement(
      merge(status, { props, args: args || { type: 'empty' } }),
      node
    )
  } else {
    console.log('parseElement: cannot parse as element!')
    showcode(status.code, node)
  }
}
