// props are things passed to the elements
const { showcode } = require('../util')

exports.parseProps = (status, node) => {
  // pass props to the element -- all nicely wrapped
  // have a system now for multi var props (combinations etc)
  // can check if in the fold stuff is used
}

const parseDefault = (status, node) => {
  // this needs some code from ui / language since this looks different in others
  return status.code.slice(node.start, node.end)
}

// args are things used by the element
exports.parseArgs = (status, node) => {
  const arg = node.params[0]
  const type = arg.type
  const result = {}
  if (type === 'Identifier') {
    result.type = 'Identifier'
    result.val = arg.name
  } else if (type === 'ObjectPattern') {
    result.type = 'ObjectPattern'
    result.val = []
    arg.properties.forEach(prop => {
      if (prop.value.type === 'AssignmentPattern') {
        // need to parse right -- same as expression of course
        result.val.push({
          key: prop.key.name,
          val: prop.value.left.name,
          default: parseDefault(status, prop.value.right)
        })
      } else {
        result.val.push({
          key: prop.key.name,
          val: prop.value.name,
        })
      }
    })
  } else if (type === 'AssignmentPattern') {
    console.log('\n-----------------------------------------')
    console.log('AssignmentPattern on Props directly not supported yet...')
    showcode(status.code, arg)
    console.log('-----------------------------------------')
  }
  return result
}
