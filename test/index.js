// fs.writeFileSync(__dirname + '/jsx.transpiled.real.js', data.results[0].output)  //eslint-disable-line
const fs = require('fs')
const { join } = require('path')
const parse = require('../')
const test = require('tape')

const createTest = (file) => {
  const code = fs.readFileSync(join(__dirname, file)).toString()
  parse(code, (err, data) => {
    console.log('go parse', err, data)
  })
}

createTest('props/basic')
