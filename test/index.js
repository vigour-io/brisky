const { Struct } = require('../')

const master = new Struct()

master.set({
  deep: {
    real: 'thing'
  },
  pointers: {
    pointer1: ['@', 'deep'],
    pointer2: ['@', 'deep', 'real'],
    pointer3: ['@', 'pointers', 'pointer1'],
    pointer4: ['@', 'pointers', 'pointer2']
  }
})

console.log('pointer1:', master.get(['pointers', 'pointer1', 'real']).val)
console.log('pointer2:', master.get(['pointers', 'pointer2']).val)
console.log('pointer3:', master.get(['pointers', 'pointer3', 'real']).val)
console.log('pointer4:', master.get(['pointers', 'pointer4']).val)
console.log(master)
console.log(master.get('pointers'))
console.log(master.get(['pointers', 'pointer2']))

// const state = new Struct()
//
// const arr = {}
//
// const blur = {
//   val: 'blurblurblur'
// }
// var i = 10
// while (i--) {
//   blur['x' + i] = 'blur' + i
// }
//
// i = 80
// while (i--) {
//   arr[i] = {
//     val: 'hello' + i,
//     a: 'a' + i,
//     b: 'b' + i,
//     c: 'c' + i,
//     nested: blur
//   }
// }
//
// // set property dont check keys totally fine
//
// var d = Date.now()
// state.set(arr)
// console.log('set + create 100k * 4', Date.now() - d, 'ms')
//
// d = Date.now()
// i = 1
// var r
// while (i--) {
//   r = state.get(2023)
// }
// console.log('get 1mil', Date.now() - d, 'ms', r)
//
// console.log(state)
// global.state = state
//
// console.log(Object.keys(state.leaves).length)
