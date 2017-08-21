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

console.log('compute pointer1:', master.get(['pointers', 'pointer1', 'real']).compute())
console.log('compute pointer2:', master.get(['pointers', 'pointer2']).compute())
console.log('compute pointer3:', master.get(['pointers', 'pointer3', 'real']).compute())
console.log('compute pointer4:', master.get(['pointers', 'pointer4']).compute())
console.log('inspect master:', master)
console.log('inspect pointers:', master.get('pointers'))
console.log('inspect pointer2:', master.get(['pointers', 'pointer2']))
console.log('path of deep/real:', master.get(['deep', 'real']).path())
console.log('serialize pointers:', master.get(['pointers']).serialize())
console.log('serialize deep:', master.get(['deep']).serialize())
console.log('serialize master:', master.serialize())

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
