// fs.writeFileSync(__dirname + '/jsx.transpiled.real.js', data.results[0].output)  //eslint-disable-line
const fs = require('fs')
const { join } = require('path')
const parse = require('../')
const test = require('tape')

const createTest = (folder, file) => {
  const code = fs.readFileSync(join(__dirname, folder, file + '.js')).toString()
  parse(code, (err, data) => {
    if (err) {
      console.log('cannot parse :(', err)
    } else {
      console.log('success write file')
      fs.writeFileSync(join(__dirname, folder, 'result', file + '.js'), data)
    }
  })
}

createTest('props', 'paths')
