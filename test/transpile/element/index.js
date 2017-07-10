const { showcode } = require('../util')

const { parseArgs, parseProps } = require('./props')

const parseJSXElement = (status, node, props, args) => {
  console.log(args)
  // if args === ObjectPattern || args === Identifier
  // if !props (all is subscription)

}

exports.parseElement = (status, node, props, args) => {
  // { subs, functions, components, code }

  const type = node.type

  if (type === 'ArrowFunctionExpression' || type === 'FunctionExpression') {
    // there is more difference ofc
    parseJSXElement(status, node, props, parseArgs(status, node))
    // only difference is that we now need to parse the args
    // node.params
  } else if (type === 'JSXElement') {
    // here you dont need to parse the args at all
    parseJSXElement(status, node, props, args || { type: 'empty' })
  } else {
    console.log('cannot parse as element!')
    showcode(status.code, node)
  }
}
