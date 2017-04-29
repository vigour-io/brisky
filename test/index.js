var Hub = require('hub.js')
var state = Hub({ something: {} })
var amount = 8e3
// -------------------------
var cnt = 0
var canvas = document.createElement('canvas')
canvas.id = 'canvas'
canvas.width = 1000
canvas.height = 1000
document.body.style.backgroundColor = 'black'
document.body.appendChild(canvas)
var context = canvas.getContext('2d')
var dir = 2
context.fillStyle = 'white'
// -------------------------
function goCanvas () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  cnt += dir
  if (cnt > 2500 || cnt < 1) {
    dir = -1 * dir
  }
  var x = {}
  for (var i = 0; i < amount; i++) {
    x[i] = i + cnt
  }
  state.something.set(x)
  window.requestAnimationFrame(goCanvas)
}
// -------------------------
function listen (target, type, stamp) {
  var val = target.compute()
  var i = target.key
  var x =
    Math.sin(val / 5 + cnt / 40) * 300 +
    i * 0.02 + 500 +
    Math.cos(val + cnt / (40 - i / 1000)) * 10
  var y =
    Math.cos(val / 10) * 300 +
    i * 0.02 + 400 +
    Math.sin(val + cnt / (40 - i / 1000)) * 10
  context.fillRect(x, y, 1, 1)
}
// -------------------------
var tree = state.subscribe({ something: { $any: { val: true } } }, listen)
// -------------------------
console.log('TREE', tree)
console.log('START ' + amount)
goCanvas()
