const acornjsx = require('acorn-jsx')

module.exports = (code, ast) => {
  if (!ast) {
    ast = acornjsx.parse(code, {
      plugins: { jsx: true },
      sourceType: 'module',
      allowHashBang: true
    })
  }
}

const fs = () => {

}
