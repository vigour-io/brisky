const { Struct } = require('../')
console.log(Struct)

const state = new Struct()

const arr = {}

const blur = {
  val: 'blurblurblur'
}
var i = 10
while (i--) {
  blur['x' + i] = 'blur' + i
}

i = 80
while (i--) {
  arr[i] = {
    val: 'hello' + i,
    a: 'a' + i,
    b: 'b' + i,
    c: 'c' + i,
    nested: blur
  }
}

// set property dont check keys totally fine

var d = Date.now()
state.set(arr)
console.log('set + create 100k * 4', Date.now() - d, 'ms')

d = Date.now()
i = 1
var r
while (i--) {
  r = state.get(2023)
}
console.log('get 1mil', Date.now() - d, 'ms', r)

console.log(state)
global.state = state
// createTest('props', 'children')

console.log(Object.keys(state.leaves).length)
