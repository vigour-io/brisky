const { walker, showcode } = require('../util')
var cnt = 0

// parse props that are being passed to an element
// usefull for some methods perhaps to put it in a class
// class Expresion {
//   constructor (type, val) {

//   }
// }
// lots to do here

const createPropFromExpression = (status, node) => {
  const props = status.props
  const args = status.args
  const val = {}
  const expression = status.code.slice(node.start, node.end).split('')
  const start = node.start
  console.log(`expression: "${expression}"`)

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
                // also take care if perhaps the val is the same
                val.type = 'struct'
                val.key = `__${++cnt}__`
                // PATHS!

                // key can be an array
                val.val = [ args.val[i].key ]
                // default!
                const replacement = arg.default
                  ? `(${val.key} || ${arg.default})`
                  : val.key

                val.expression = { type: 'inline', replacement: [] }
                val.expression.replacement.push([ child, replacement ])

                console.log(val.expression.val)
              } else {
                // also not enough key can be an array....
                if (args.val[i].key === val.val[0]) {
                  const replacement = arg.default
                    ? `(${val.key} || ${arg.default})`
                    : val.key
                  val.expression.replacement.push([ child, replacement ])
                } else {
                  console.log('THIS IS A MULTI SUBSCRIPTION NEED TO MAKE REF PROP TYPE')
                }
              }
            } else {
              // very different obvisouly
              // also lot of these things can be reused for switch etc
              // this is a bit harder -- allways results to reference types
              // lets get multiple straight
              // need to do shit like reference parsing also props need to have subs path correction etc
              // need to take care of props as well
              // coud just say its allways from the top the path in the subs
              // that will make it rly easy
              console.log('have props different parsing')
            }
            break
          }
        }
      } else if (args.type === 'Identifier') {
        console.log('using props --- do something!')
      }
    }
  })

  if (val.expression.type === 'inline') {
    let code = ''
    let replacement = 0

    showcode(status.code, val.expression.replacement.map(val => val[0]))

    // make a util for this kind of shit
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
    console.log('CODE:', code)
    val.expression.val = code
  }

  /*
    const result = expression.split('')
    const index = child.start - start
    result.splice(index, child.end - child.start, replacement)
  */
  // need to delete nested references
  // also many types
  return val
}

exports.createPropFromExpression = createPropFromExpression
