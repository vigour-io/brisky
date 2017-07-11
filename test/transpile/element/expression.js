const { showcode, walker } = require('../util')
var cnt = 0

// parse props that are being passed to an element
// usefull for some methods perhaps to put it in a class
// class Expresion {
//   constructor (type, val) {

//   }
// }

const createPropFromExpression = (status, node) => {
  // need to use status paths to get correct path in subs / t
  // maybe add them here?
  console.log('parse expression', node)
  const props = status.props
  const args = status.args
  const val = {}
  const expression = status.code.slice(node.start, node.end)
  console.log(`expression: "${expression}"`)
  // set .val

  // this file needs most love....
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
                val.val = [ args.val[i].key ]
                // default!
                let result
                if (arg.default) {
                  // use indexes this is not enough!
                  result = expression.replace(new RegExp(name, 'g'), `(${val.key} || ${arg.default})`)
                } else {
                  result = expression.replace(new RegExp(name, 'g'), val.key)
                }
                // expression: type inline and function (which can be re-used)
                val.expression = {
                  type: 'inline',
                  val: result
                }
              } else {
                // multiple -- multiple can be checked better
              }
            } else {
              // lets get multiple straight
              // need to do shit like reference parsing also props need to have subs path correction etc
              // need to take care of props as well
              // coud just say its allways from the top the path in the subs
              // that will make it rly easy
              console.log('have propas different parsing')
            }
            break
          }
        }
      } else if (args.type === 'Identifier') {
        console.log('using props --- do something!')
      }
    }
  })
  // also many types
  return val
}

exports.createPropFromExpression = createPropFromExpression
