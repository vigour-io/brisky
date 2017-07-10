const { showcode, walker } = require('../util')

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

const parseIdentifier = (status, node, props, args) => {

}

const parseExpression = (status, node, props, args) => {
  if (node.type === 'JSXExpressionContainer') {
    // needs to go to own file!!!!
    // here we need to start creating shit
    console.log('parse expression')
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
  if (!props) {
    console.log('JSXElement Props: all subscription')
    // all props are struct
    showcode(status.code, node)
    const openingElement = node.openingElement
    const parentId = createElement(status, openingElement)
    const children = node.children
    // als here need to check for parentId
    // if first -- do shit
    walker(children, child => {
      createAndAdd(status, child, parentId)
      parseExpression(status, child, props, args)
      // console.log(child.type)
    })
  } else {
    console.log('got props!')
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
