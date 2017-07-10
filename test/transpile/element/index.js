const { parseArgs, parseProps } = require('./props')

const parseJSXElement = (status, node, props, args) => {

  console.log(args)

}

exports.parseElement = (status, node, props, args) => {
  // { subs, functions, components, code }

  const type = node.type

  if (type === 'ArrowFunctionExpression') {
    parseJSXElement(status, node, props, parseArgs(status, node))
    // only difference is that we now need to parse the args
    // node.params
  } else if (type === 'FunctionExpression') {
    args = parseArgs(status, node, props, parseArgs(status, node))
    // only difference is that we now need to parse the args
    // node.params
  } else if (type === 'JSXElement') {
    // here you dont need to parse the args at all
    parseJSXElement(status, node, props, args || { type: 'empty' })
  }
}
