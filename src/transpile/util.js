const chalk = require('chalk')

const walker = (node, parse, parent) => {
  // console.log('walk!')
  if (parent && !node.parent) {
    Object.defineProperty(node, 'parent', { value: parent, enumerable: false })
  }
  const val = parse(node)
  if (!val) {
    const keys = Object.keys(node)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (key === 'parent') continue
      let child = node[key]
      if (Array.isArray(child)) {
        for (let j = 0; j < child.length; j++) {
          let c = child[j]
          if (c && typeof c.type === 'string') walker(c, parse, node)
        }
      } else if (key !== 'elem' && child && typeof child.type === 'string') {
        walker(child, parse, node)
      }
    }
  } else {
    return val
  }
}

const merge = (status, val) => {
  return Object.assign({}, status, val)
}

const showcode = (str, start, end) => { // eslint-disable-line
  if (typeof str === 'object') str = str.code
  if (typeof start === 'object') {
    if (start.end) {
      showcode(str, start.start, start.end)
    } else {
      for (let i in start) {
        showcode(str, start[i].start, start[i].end)
      }
    }
  } else {
    console.log(
      chalk.blue(str.slice(start - 50 > 0 ? start - 50 : 0, start)) +
      chalk.green(str.slice(start, end)) +
      chalk.blue(str.slice(end, end + 50 > str.length ? str.length : end + 50))
    )
  }
}

const getObject = (status, node) => {
  if (node.parent && node.parent.type === 'MemberExpression') {
    let child = node.parent
    let prev = child
    while (child && child.type === 'MemberExpression') {
      if (child.parent && child.parent.type === 'CallExpression') {
        // do special shit here -- need to inline .root .parent
        // make hooks for those perhaps? --- method calls are special
        // also make it possible to add root in your path with a default val?
        break
      }
      prev = child
      child = child.parent
    }
    return prev
  } else {
    return node
  }
}

const extractPath = (status, node) => {
  if (node.parent && node.parent.type === 'MemberExpression') {
    const path = []
    let child = node.parent
    if (node.type === 'Identifier') {
      path.push(node.name)
    }
    while (child && child.type === 'MemberExpression') {
      if (child.parent && child.parent.type === 'CallExpression') {
        // do special shit here -- need to inline .root .parent
        // make hooks for those perhaps? --- method calls are special
        // also make it possible to add root in your path with a default val?
        break
      }
      path.push(child.property.name)
      child = child.parent
    }
    return path
  } else if (node.type === 'Identifier') {
    return [ node.name ]
  }
}

const assembleFunctions = subs => {
  if (subs._) {
    for (let fn in subs._) {
      var parsed
      if (fn === 'new') {
        parsed = `(state, type, subs, tree) => { \nif (!tree._) tree._ = {}\n`
      } else {
        parsed = `(state, type, subs, tree) => { \n`
      }
      subs._[fn] = parsed + subs._[fn].join('\n') + '\n }'
    }
  }
  for (let key in subs) {
    if (typeof subs[key] === 'object' && key !== '_') {
      assembleFunctions(subs[key])
    }
  }
  return subs
}

const string = val => {
  // do checks if its not allready like this
  return `'${val}'`
}

const isEqual = (a, b) => {
  var i = a.length
  if (i !== b.length) return false
  while (i--) {
    if (b[i] !== a[i]) {
      return false
    }
  }
  return true
}

const resolvePath = (target, other) => {
  if (isEqual(target, other)) {
    return ''
  }
  var str = `.parent(${target.length}).get([ ${other.map(string)} ])`
  return str
}

exports.string = string
exports.showcode = showcode
exports.walker = walker
exports.assembleFunctions = assembleFunctions
exports.merge = merge
exports.isEqual = isEqual
exports.extractPath = extractPath
exports.getObject = getObject
exports.resolvePath = resolvePath
