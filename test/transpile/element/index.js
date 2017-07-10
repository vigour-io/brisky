const { showcode, walker, string } = require('../util')
const { createPropFromExpression } = require('./expression')
/*
implement these in the framework
View, Text, Image
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
  // if child.tag does not start with a captial !== <X />
  const id = createElement(status, child)
  if (id) {
    child.id = id
    addElement(status, (child.parent && child.parent.id) || parentId, id)
  }
  // else needs to call nested parseJSXElement and calc props for it
  return id
}

/*
    // if children...
    // if (type === 'ObjectPattern') {
    //   console.log('\nargs.type === ObjectPattern')
    //   // pre-defined args

    // }
    // else if (type === 'Identifier') {
    //   walker(children, child => {
    //     createAndAdd(status, child, parentId)
    //   })
    // }
*/

// prop calculation helper

// const addChild = (status, node, props, args) => {

// }
// move to expression

// pass props and args as well....
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

const parseJSXElement = (status, node, props, args) => {
  // args
    // type === 'empty'
    // type === 'ObjectPattern'
    // type === 'Identifier'
  // props
  // if !props (all is subscription)
  console.log('JSXElement Arguments:\n', args)
  console.log('JSXElement Props: all subscription')
  // all props are struct
  showcode(status.code, node)
  const openingElement = node.openingElement
  if (openingElement.id) {
    // reset id
    openingElement.id = false
  }
  const parentId = createElement(status, openingElement)
  const children = node.children
  // als here need to check for parentId
  // if first -- do shit
  walker(children, child => {
    createAndAdd(status, child, parentId)
    parseExpressionContainer(status, child, props, args)
  })

  return parentId
  // switch in a function (using closures)
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
        } else if (type === '') { // if statements
          // walk if statements
        }
      })

      // no switch and straight
      if (!results.switch && results.straightReturnJSX) {
        // results.straightReturnJSX
        console.log('results.straightReturnJSX')
        // if subs change need to pass own status object
        parseJSXElement(status, results.straightReturnJSX, props, parseArgs(status, node))
      }
    }
    // parseJSXElement(status, node, props, parseArgs(status, node))
    // only difference is that we now need to parse the args
    // node.params
  } else if (type === 'JSXElement') {
    // here you dont need to parse the args at all
    // find jsx element else there is switch / any involved
    parseJSXElement(status, node, props, args || { type: 'empty' })
  } else {
    console.log('cannot parse as element!')
    showcode(status.code, node)
  }
}
