const { walker, isEqual, extractPath, getObject, showcode } = require('../../util')
var cnt = 0

const exists = (val, path) => {
  for (let key in val.val) {
    if (val.val[key].type === 'struct' && isEqual(path, val.val[key].val)) {
      return key
    }
  }
}

const getArg = (args, name) => {
  var i = args.val.length
  while (i--) {
    const arg = args.val[i]
    if (arg.val === name) {
      return arg
    }
  }
}

const createPropFromExpression = (status, node) => {
  var val = {}
  const props = status.props
  const args = status.args
  const expression = status.code.slice(node.start, node.end).split('')
  const start = node.start
  // need to have path as well
  console.log(`expression: "${expression.join('')}"`)

  walker(node, child => {
    const isObject = args.type === 'ObjectPattern'
    const isIdentifier = args.type === 'Identifier'
    if (isIdentifier || isObject) {
      const path = extractPath(status, child)
      const arg = isObject && getArg(args, child.name)
      if (arg || (isIdentifier && path && path[0] === args.val)) {
        if (isIdentifier) {
          path.shift()
        } else if (arg) {
          path[0] = arg.key
        }
        if (!props) {
          if (!val.type) {
            val.type = 'struct'
            // not enough....
            // need to map keys
            val.val = path
            const replacementKey = `__${++cnt}__`
            const replacement = arg && arg.default ? `(${replacementKey} || ${arg.default})` : replacementKey
            val.expression = { type: 'inline', replacement: [], replacementKey }
            val.expression.replacement.push([ getObject(status, child), replacement ])
          } else {
            if (val.type === 'struct') {
              const prev = val
              const expression = prev.expression
              delete prev.expression
              val = {
                type: 'group',
                val: {
                  [expression.replacementKey]: prev
                },
                expression
              }
              expression.replacementKey = [ expression.replacementKey ]
              let replacement = exists(val, path)
              if (!replacement) {
                const nested = {}
                nested.type = 'struct'
                nested.val = path
                nested.fromSubscription = status.path
                replacement = `__${++cnt}__`
                val.val[replacement] = nested
                expression.replacementKey.push(replacement)
              }
              expression.replacement.push([ getObject(status, child), replacement ])
            } else if (val.type === 'group') {
              // again need to know if struct ofc...
              const expression = val.expression
              let replacement = exists(val, path)
              if (!replacement) {
                const nested = {}
                nested.type = 'struct'
                nested.val = path
                nested.fromSubscription = status.path
                const replacementKey = `__${++cnt}__`
                replacement = arg && arg.default ? `(${replacementKey} || ${arg.default})` : replacementKey
                expression.replacementKey.push(replacementKey)
                val.val[replacementKey] = nested
              }
              expression.replacement.push([ getObject(status, child), replacement ])
            } else if (val.type === 'raw') {
              // raw
            }
          }
        } else {
          // for when used as a child
          // very different obvisouly
          // need the reference thing -- if mulple fields make an object using the path / key as keys (easy for debug)
          console.log('!!! have props different parsing !!!')
        }
      }
    }
  })

  if (!val.expression) {
    console.log('\ncould not parse expression')
    showcode(status, node)
    console.log('\n')
    // can also just be raw ofc....
    return { type: 'error' }
  }

  // this replacement thing can become a util
  if (val.expression.type === 'inline') {
    let code = ''
    let replacement = 0
    for (let i = 0; i < expression.length; i++) {
      const replace = val.expression.replacement[replacement]
      if (replace) {
        const rstart = replace[0].start - start
        const range = (replace[0].end - replace[0].start) + rstart
        if (i >= rstart && i < range) {
          if (i === rstart) {
            code += replace[1]
          }
          if (i === range - 1) {
            replacement++
          }
        } else {
          code += expression[i]
        }
      } else {
        code += expression[i]
      }
    }

    delete val.expression.replacement
    val.expression.val = code
  } else {
    console.log('no support for complex expressions yet')
  }

  return val
}

exports.createPropFromExpression = createPropFromExpression
