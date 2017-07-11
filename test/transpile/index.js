const acornjsx = require('acorn-jsx')
const { assembleFunctions, string } = require('./util')
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
    const subs = { val: string('switch') }
    const originalSubs = subs
    const path = []
    // functions that can be used by the program
    const functions = {}

    parseElement(
      { subs, functions, components, code, ui, path, originalSubs },
      components[entry]
    )

    return assembleFunctions(subs)
  } else {
    console.log('cannot find component:', entry)
  }
}
