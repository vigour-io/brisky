const { showcode, walker } = require('../util')

/*
implement these in the framework
View, Text, Image
*/

const { parseArgs, parseProps } = require('./props')

var cnt = 0

const getNewListeners = ({ subs }) => {
  if (!subs._) subs._ = {}
  if (!subs._.new) subs._.new = []
  return subs._.new
}

const createElement = (status, child) => {
  const type = child.type
  if (type === 'JSXOpeningElement') {
    const type = child.name && child.name.name
    console.log(type)
    const newListeners = getNewListeners(status)
    const id = ++cnt
    newListeners.push(status.ui.createElement(id, type))
    return id
  }
}

const addElement = (status, id, childId) => {
  const newListeners = getNewListeners(status)
  newListeners.push(status.ui.addChild(id, childId))
}

const parseJSXElement = (status, node, props, args) => {
  // args
  // type === 'empty'
  // type === 'ObjectPattern'
  // type === 'Identifier'
  // props
  // if !props (all is subscription)
  console.log('JSXElement Arguments:\n', args)
  if (!props) {
    console.log('JSXElement Props: all subscription')
    // all props are struct
    showcode(status.code, node)
    if (args.type === 'ObjectPattern') {
      console.log('\nargs.type === ObjectPattern')
      // pre-defined args
      console.log(node)
      const openingElement = node.openingElement
      const parentId = createElement(status, openingElement)
      walker(node.children, child => {
        const id = createElement(status, child)
        if (id) {
          child.id = id
          addElement(status, (child.parent && child.parent.id) || parentId, id)
        }
      })
    }
  }

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
