// fs.writeFileSync(__dirname + '/jsx.transpiled.real.js', data.results[0].output)  //eslint-disable-line
// const fs = require('fs')
// const { join } = require('path')
// const parse = require('../')
// const test = require('tape')

// const createTest = (folder, file) => {
//   // const code = fs.readFileSync(join(__dirname, folder, file + '.js')).toString()
//   // parse(code, (err, data) => {
//   //   if (err) {
//   //     console.log('cannot parse :(', err)
//   //   } else {
//   //     console.log('success write file')
//   //     fs.writeFileSync(join(__dirname, folder, 'result', file + '.js'), data)
//   //   }
//   // })
// }
console.log('bla......')
const { Struct } = require('../')
console.log(Struct)

const state = new Struct()

const arr = {}
var i = 1e5
while (i--) {
  arr[i] = {
    val: 'hello' + i,
    a: 'a' + i,
    b: 'b' + i,
    c: 'c' + i
  }
}

var d = Date.now()
state.set(arr)
console.log('set + create 100k * 4', Date.now() - d, 'ms')

d = Date.now()
i = 1e5
var r
while (i--) {
  r = state.get(2023)
}
console.log('get 1mil', Date.now() - d, 'ms', r)

console.log(state)
global.state = state
// createTest('props', 'children')
