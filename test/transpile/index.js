const acornjsx = require('acorn-jsx')
const { walker, showcode, assembleFunctions } = require('./util')
const { collect } = require('./components')
const { parseElement } = require('./element')

module.exports = (code, ui, ast, entry = 'App') => {
  if (!ast) {
    try {
      ast = acornjsx.parse(code, {
        plugins: { jsx: true },
        sourceType: 'module',
        allowHashBang: true
      })
    } catch (e) {
      console.log('ERROR IN ACORN', e)
      return
    }
  }

  const components = collect(ast)
  console.log('components:', Object.keys(components))

  if (components[entry]) {
    console.log('entry component:', entry)
    // here we can start
    const subs = { val: 'switch' }
    // functions that can be used by the program
    const functions = {}

    parseElement({ subs, functions, components, code }, components[entry])

    console.log('parsed subs')
  } else {
    console.log('cannot find component:', entry)
  }
}