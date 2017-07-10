const { showcode, walker } = require('../util')
var cnt = 0

// parse props that are being passed to an element
// class Expresion {
//   constructor (type, val) {

//   }
// }

const createPropFromExpression = (status, node, props, args) => {
  console.log('parse expression', node)
  const val = {}
  const expression = status.code.slice(node.start, node.end)
  console.log(`expression: "${expression}"`)
  // set .val
  walker(node, (child) => {
    if (child.type === 'Identifier') {
      const name = child.name
      if (args.type === 'ObjectPattern') {
        let i = args.val.length
        while (i--) {
          const arg = args.val[i]
          if (arg.val === name) {
            if (!props) {
              if (!val.type) {
                val.type = 'struct'
                val.key = '_$' + ++cnt
                val.val = [ args.val[i].key ]
                // default!
                let result
                if (arg.default) {
                  result = expression.replace(name, val.key)
                } else {
                  result = expression.replace(name, `('${val.key}|| ${arg.default}')`)
                }

                val.expression = {
                  type: 'inline',
                  val: result
                }
              } else {
                // multiple
              }
            } else {
              // need to take care of props as well
            }
            break
          }
        }
      } else if (args.type === 'Identifier') {
        // console.log('hello')
      }
    }
  })
  // also many types
  return val
}

exports.createPropFromExpression = createPropFromExpression
