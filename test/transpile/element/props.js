// props are things passed to the elements
exports.parseProps = (status, node) => {
  // pass props to the element -- all nicely wrapped
  // have a system now for multi var props (combinations etc)
  // can check if in the fold stuff is used
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
    arg.properties.forEach(prop => result.val.push({
      key: prop.key.name, // to map props / subscriptions (for the top)
      val: prop.value.name
    }))
  }
  return result
}
