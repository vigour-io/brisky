const acornjsx = require('acorn-jsx')
const { walker, showcode, assembleFunctions, hasArg } = require('./util')
// walker
var id = 0


//
const createUIElement = (id, tag) => {
  return `var $${id} = document.createElement('${tag}') // :D`
}


// this is for text or perhaps children etc
// AKA TEXT

// for text only need to structure this nicely once all is there
const expressionParser = (code, node, subs, args, components) => {
  if (node.expression) {
    if (node.expression.type === 'Identifier') {
      const arg = hasArg(node.expression.name, args)
      if (arg) {
        // or children ofc
        if (arg.isChild) {
          console.log('CHILD')
          // if and shit...
          // allrdy needs its props
          // const parseElement = (code, node, subs, props, pid, components, addToTree) => {
          // needs to do a lot more -- props management
          return parseElement(code, arg.isChild, subs, arg.props, false, components)
        } else if (arg.isState) {
          const myId = ++id
          // needs arrays as well..
          if (typeof arg.map === 'object') {
            console.log('MAP ARRAY PATH! NOT IMPLEMENTED YET!!!!!!!!!')
            const sub = arg.map[0]
            if (arg.isTransformer) {
              const value = `s.get('${sub}', '').compute()`
              let x = arg.isTransformer[0]
              x = x.replace(sub, value)
                      console.log( '!@#!@#!@#!@#', x)

              subs._.new.push(`var $${myId} = tree._[${myId}] = document.createTextNode(${x})`)

              if (!subs[sub]) {
                subs[sub] = {}
              }
              const nestSubs = subs[sub]
              if (nestSubs.val !== true) {
                nestSubs.val = `'shallow'` // eslint-disable-line
              }
              if (!nestSubs._) nestSubs._ = {}
              if (!nestSubs._.update) nestSubs._.update = []
              let x2 = arg.isTransformer[0]
              x2 = x2.replace(sub, 's.compute()')
              // console.log(arg.isState[0])
              // if (arg.isState[0][1].isTransformer) {
              //   console.log('here you go transformer')
              // }
              nestSubs._.update.push(`findParent(tree, ${myId}).nodeValue = ${x2}`)
            }
            return myId
          } else {
            const value = `s.get('${arg.map}', '').compute()`

                                  console.log( '!@#!@#!@#!@#', value)

            subs._.new.push(`var $${myId} = tree._[${myId}] = document.createTextNode(${value})`)

            if (!subs[arg.map]) {
              subs[arg.map] = {}
            }
            const nestSubs = subs[arg.map]
            if (nestSubs.val !== true) {
              nestSubs.val = `'shallow'` // eslint-disable-line
            }
            if (!nestSubs._) nestSubs._ = {}
            if (!nestSubs._.update) nestSubs._.update = []
            nestSubs._.update.push(`findParent(tree, ${myId}).nodeValue = s.compute()`)
            return myId
          }
        } else {
          console.log('non state prop')
          if (arg.val) {
            const myId = ++id
            console.log( '2222!@#!@#!@#!@#', arg.val)
            subs._.new.push(`var $${myId} = document.createTextNode(\`${arg.val}\`)`)
            return myId
          }
        }
      }
    } else if (node.expression.type === 'BinaryExpression') {
      // lets walk
      // const letssee what we got
      const myId = ++id
      // expressions can go into functions that get reused?

      var parseit = code.slice(node.start + 1, node.end - 1).split('')

      var parsed

      // console.log('???', parseit)

      var addToStates = []

      walker(node.expression, leaf => {
        // console.log(leaf.type, leaf.name)
        if (leaf.type === 'Identifier') {
          const arg = hasArg(leaf.name, args)
          if (arg) {
            if (arg.isState) {
              addToStates.push([ leaf, arg ])
            } else {
              console.log('non - state later')
            }
          }
        }
      })

      if (addToStates.length) {
        var onNewValue = parseit.concat()

        addToStates.forEach(([ leaf, arg ]) => {
          if (arg.isState) {
            const value = `s.get('${arg.map}', '').compute()`
            onNewValue.splice(leaf.start - (node.start + 1), leaf.end - leaf.start, value)
          }
        })

        const value = onNewValue.join('')
        subs._.new.push(`var $${myId} = tree._[${myId}] = document.createTextNode(${value})`)
        parsed = true
        // this is hard
        addToStates.forEach(([ sleaf, sarg ]) => {
          var onNewValueUpdate = parseit.concat()
          addToStates.forEach(([ leaf, arg ]) => {
            if (leaf === sleaf) {
              if (arg.isState) {
                const value = 's.compute()'
                onNewValueUpdate.splice(leaf.start - (node.start + 1), leaf.end - leaf.start, value)
              }
            } else {
              console.log('relative')
            }
          })
          if (!subs[sarg.map]) {
            subs[sarg.map] = {}
          }
          const nestSubs = subs[sarg.map]
          if (nestSubs.val !== true) {
            nestSubs.val = `'shallow'` // eslint-disable-line
          }
          if (!nestSubs._) nestSubs._ = {}
          if (!nestSubs._.update) nestSubs._.update = []
          nestSubs._.update.push(`findParent(tree, ${myId}).nodeValue = ${onNewValueUpdate.join('')}`)
          // rewrite fo each state
        })
        // also need to write the subs for each subs word -- do the multiple see how it goes
        // listener on both values in a subscription
        // and then finding the the other relative the the other can be many values ofc...
        // var onSubsValue
      } else {
        console.log('normal')
      }

      return parsed && myId
      // all identifiers should come from 'args'
      // new code
    } else {
      if (node.expression.value) {
        console.log( '!@#!@#!@#!@#', node.expression.value)
        const myId = ++id
        const value = node.expression.value
        subs._.new.push(`var $${myId} = document.createTextNode('${value}')`)
        return myId
      }
    }
  }
}

const JSXExpressionContainer = (code, node, subs, args, components) => {
  return expressionParser(code, node, subs, args, components)
}

const parseJSXElement = (code, node, subs, args, pid, components) => {
  if (!subs._) subs._ = {}
  if (!subs._.new) subs._.new = []
  const tag = node.openingElement.name.name
  const myId = pid || ++id
  // if tag starts with a capital find the module its linking to
  // limitation for now only from the global or +1 scope -- need to list all types avaible
  // this also means that we need to transpile the names of modules into one file in b-boy
    // subs._.new.push(`// id $${myId} from ${tag}`)

  if (/[A-Z]/.test(tag[0])) {
    console.log('IS EXTERNAL COMPONENT', tag)
    // map props thats step 1
    // console.log(node.openingElement.attributes)
    const props = {}

    // this is the most important part basicly
    if (node.openingElement.attributes) {
      console.log('\nmap the props...')
      node.openingElement.attributes.forEach(attr => {
        const type = attr.value.expression && attr.value.expression.type
        // objects ofc
        if (type === 'Identifier') {
          const arg = hasArg(attr.value.expression.name, args)
          if (arg) {
            props[attr.name.name] = {
              key: attr.name.name,
              map: arg.map,
              isState: arg.isState
              // can have val as well ofc
            }
            // console.log(props)
          } else {
            console.log('normal attr from var not implemented yet', attr.name.name)
            // include the var in code if its located in the function
            // props[attr.name.name] = {
            //   key: attr.name.name,
            //   val:
            // }
          }
        } else if (attr.value && attr.value.type === 'Literal') {
          // console.log(type, attr)
          props[attr.name.name] = {
            key: attr.name.name,
            val: attr.value.value
            // can have val as well ofc
          }
          console.log('its a literal')
        } else {
          // do it do it do it
          const expression = attr.value.expression
          console.log('right hur', expression)
          showcode(code, expression)
          if (expression.type === 'JSXElement') {
            // need to do props right hur!
            props[attr.name.name] = {
              key: attr.name.name,
              isChild: expression,
              props: {}
              // can have val as well ofc
            }
          } else {
            var addToStates = []
            walker(expression, leaf => {
              if (leaf.type === 'Identifier') {
                const arg = hasArg(leaf.name, args)
                if (arg) {
                  // console.log('here', arg)
                  if (arg.isState) {
                    addToStates.push([ { start: leaf.start - expression.start, end: (leaf.end - leaf.start) }, arg ])
                  } else {
                    console.log('non - state later')
                  }
                }
              }
            })

            // let fn = '('
            // need to shave of the expression chars
            let body = code.slice(attr.value.expression.start, attr.value.expression.end).split('')

            addToStates.forEach(val => {
              if (val[1].isTransformer) {
                body.splice(val[0].start, val[0].end, '(' + val[1].isTransformer + ')')
              } else {
                body.splice(val[0].start, val[0].end, val[1].map)
              }
              // fn += val[1].map + ','
            })

            // if (fn[fn.length - 1] === ',') fn = fn.slice(0, -1)

            // fn += ') => { return (' + body.join('') + ')}'

            // console.log('FN:', fn)

            // these fns will be stored on the top of the file

            // can also use a previous prop so be care full here
            // transform over transform

            props[attr.name.name] = {
              key: attr.name.name,
              isTransformer: [ body.join('') ],
              // result is literal
              isState: addToStates,
              map: addToStates.map(([ node, attr ]) => attr.map) // these guys tell whats nessecary
              // can have val as well ofc
            }
          }
          // console.log(props)
          // its true
        }
      })
      console.log('done mapping the props...\n')
    }
    subs._.new.push(`// ${tag}`)

    if (node.children) {
      showcode(code, node.children)

      // nested or something
      props.children = {
        key: 'children',
        props: {},
        isChild: node.children[0]
      }
      // and there it goes nested shit is also nessecary!
      // props.children.value.push()
      // for each do the same as normal make a props array
    }

    parseElement(code, components[tag], subs, props, myId, components)
    subs._.new.push('// ----------')
  } else {
    subs._.new.push(createUIElement(myId, tag)) // `var $${myId} = document.createElement('${tag}')`)

    if (node.children) {
      node.children.forEach(child => {
        if (child.type === 'JSXElement') {
          const childId = parseJSXElement(code, child, subs, args, false, components)
          subs._.new.push(`$${myId}.appendChild($${childId})`)
        } else if (child.type === 'JSXExpressionContainer') {
          const childId = JSXExpressionContainer(code, child, subs, args, components)
          if (childId) {
            subs._.new.push(`$${myId}.appendChild($${childId})`)
          }
        } else {
          // console.log(child.type)
        }
      })
    }
  }

  return myId
}

// parseComponent
const parseElement = (code, node, subs, props, pid, components, addToTree) => {
  console.log('\nparseElement')

  const args = node.params
  var parsedArguments = []
  var fromProps = false

  if (node.type === 'JSXElement') {
    const parsedArguments = Object.keys(props).map(val => (props[val]))
    return parseJSXElement(code, node, subs, parsedArguments, pid, components)
  } else {
    args.forEach(node => {
      if (node.type === 'ObjectPattern') {
        // take care of bla as blarf
        node.properties.forEach(node => {
          parsedArguments.push(node.key.name)
        })
      } else if (node.type === 'Identifier') {
        fromProps = node.name
      }
    })

    if (!fromProps) {
      if (!props) {
        // means from state for now
        parsedArguments = parsedArguments.map(val => ({
          isState: true,
          key: val,
          map: val
        }))
      } else {
        // also need to add potential subscriptions if props === state
        parsedArguments = Object.keys(props).map(val => (props[val]))
      }

      node.body.body.forEach(node => {
        if (node.type === 'ReturnStatement') {
          const myId = parseJSXElement(code, node.argument, subs, parsedArguments, pid, components)
          if (addToTree) subs._.new.push(`tree._[${myId}] = $${myId} // component`)
        }
      })
    } else {
      console.log(`fromProps: "${fromProps}" not implemented yet....`)
    }
  }
}

module.exports = (code, ast) => {
  if (!ast) {
    ast = acornjsx.parse(code, {
      plugins: { jsx: true },
      sourceType: 'module',
      allowHashBang: true
    })
  }

  const result = { val: `'switch'` } // eslint-disable-line

  const components = {}

  console.log('\n\n\n--------------------------------------')
  // parse it good
  // dont need to use a walker can just find it

  for (let i = 0; i < ast.body.length; i++) {
    const node = ast.body[i]
    if (node.type === 'VariableDeclaration' && /[A-Z]/.test(node.declarations[0].id.name[0])) {
      components[node.declarations[0].id.name] = node.declarations[0].init
    }
  }

  // code, node, subs, props, pid, components
  parseElement(code, components.App, result, false, false, components, true)

  assembleFunctions(result)
  return result
}
