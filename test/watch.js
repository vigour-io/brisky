const fs = require('fs')
const jsx = fs.readFileSync(__dirname + '/jsx.js') //eslint-disable-line
const parse = require('./transpile')
const standard = require('standard')
const ui = require('./transpile/ui/browser')

console.log('\nstart parsing...')

const result = parse(jsx.toString(), ui)

const raw = [ 'module.exports = ' ]

const parseRaw = (result, key) => {
  if (typeof result === 'object') {
    if (key) {
      raw.push(key + ': ')
    }
    raw.push('{')
    for (let key in result) {
      parseRaw(result[key], key)
    }
    const l = raw.length - 1
    if (raw[l] && raw[l][raw[l].length - 1] === ',') {
      raw[l] = raw[l].slice(0, -1)
    }
    raw.push('},')
    // raw.push(',')
  } else {
    raw.push(key + ': ' + result + ',')
  }
}
parseRaw(result.subs)
raw[raw.length - 1] = raw[raw.length - 1].slice(0, -1)
// raw.unshift(`const { findParent } = require('./framework')\n`)
// fs.writeFileSync(__dirname + '/jsx.transpiled.real.js', raw.join('\n'))
// will make this super nice
const str = result.init + '\n' + raw.join('\n')

standard.lintText(str, { fix: true }, (err, data) => {
  if (err) console.log('ERR!', err)
  // console.log(data.results[0])
  fs.writeFileSync(__dirname + '/jsx.transpiled.real.js', data.results[0].output)  //eslint-disable-line
})
