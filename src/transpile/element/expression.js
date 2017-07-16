const { walker, isEqual, extractPath, getObject, showcode } = require('../util')
var cnt = 0

const createPropFromExpression = (status, node) => {
  var val = {}
  const props = status.props
  const args = status.args
  const expression = status.code.slice(node.start, node.end).split('')
  const start = node.start
  // need to have path as well
  console.log(`expression: "${expression.join('')}"`)

  walker(node, (child) => {
    if (child.type === 'Identifier') {
      const name = child.name
      if (args.type === 'ObjectPattern') {
        let i = args.val.length
        while (i--) {
          const arg = args.val[i]
          if (arg.val === name) {
            const path = extractPath(status, child)
            if (!props) {
              if (!val.type) {
                val.fromSubscription = status.path
                val.type = 'struct'
                val.val = path
                const replacementKey = `__${++cnt}__`
                const replacement = arg.default
                  ? `(${replacementKey} || ${arg.default})`
                  : replacementKey

                val.expression = { type: 'inline', replacement: [], replacementKey }
                val.expression.replacement.push([ getObject(status, child), replacement ])
              } else {
                // lets do raw as well!
                if (val.type === 'struct' && isEqual(path, val.val)) {
                  console.log('expression: type struct and isEqual dont reparse', val)
                  const replacement = arg.default
                    ? `(${val.expression.replacementKey} || ${arg.default})`
                    : val.expression.replacementKey
                  val.expression.replacement.push([ getObject(status, child), replacement ])
                } else {
                  console.log('THIS IS A MULTI SUBSCRIPTION NEED TO MAKE REF PROP TYPE')
                }
              }
            } else {
              // for when used as a child
              // very different obvisouly
              // need the reference thing -- if mulple fields make an object using the path / key as keys (easy for debug)
              console.log('!!! have props different parsing !!!')
            }
            break
          }
        }
      } else if (args.type === 'Identifier') {
        console.log('using props --- do something!')
        const path = extractPath(status, child)
        console.log('prop!', path)
        if (path[0] === args.val) {
          path.shift()
          if (!props) {
            if (!val.type) {
              val.type = 'struct'
              val.val = path
              const replacementKey = `__${++cnt}__`
              const replacement = replacementKey
              val.expression = { type: 'inline', replacement: [], replacementKey }
              val.expression.replacement.push([ getObject(status, child), replacement ])
            } else {
              if (val.type === 'struct' && isEqual(path, val.val)) {
                const replacement = val.expression.replacementKey
                val.expression.replacement.push([ getObject(status, child), replacement ])
              } else if (val.type === 'struct') {
                console.log('THIS IS A MULTI SUBSCRIPTION NEED TO MAKE REF PROP TYPE', path)
                const prev = val
                const expression = prev.expression
                delete prev.expression
                val = {
                  type: 'reference',
                  val: {
                    [expression.replacementKey]: prev
                  },
                  expression
                }
                // we dont need to parse recursively in the user
                // all work will be done here
                expression.replacementKey = [ expression.replacementKey ]
                const nested = {}
                nested.type = 'struct'
                nested.val = path
                nested.fromSubscription = status.path
                const replacementKey = `__${++cnt}__`
                const replacement = replacementKey
                expression.replacementKey.push(replacementKey)
                expression.replacement.push([ getObject(status, child), replacement ])
                val.val[replacementKey] = nested
              } else if (val.type === 'reference') {
                // more then one
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
