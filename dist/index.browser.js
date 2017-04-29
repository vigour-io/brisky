var $1546195150 = require('hub.js')
;var $606729666_Hub = $1546195150
var $606729666_state = $606729666_Hub({ something: {} })
var $606729666_amount = 8e3
// -------------------------
var $606729666_cnt = 0
var $606729666_canvas = document.createElement('canvas')
$606729666_canvas.id = 'canvas'
$606729666_canvas.width = 1000
$606729666_canvas.height = 1000
document.body.style.backgroundColor = 'black'
document.body.appendChild($606729666_canvas)
var $606729666_context = $606729666_canvas.getContext('2d')
var $606729666_dir = 2
$606729666_context.fillStyle = 'white'
// -------------------------
function $606729666_goCanvas () {
  $606729666_context.clearRect(0, 0, $606729666_canvas.width, $606729666_canvas.height)
  $606729666_cnt += $606729666_dir
  if ($606729666_cnt > 2500 || $606729666_cnt < 1) {
    $606729666_dir = -1 * $606729666_dir
  }
  var x = {}
  for (var i = 0; i < $606729666_amount; i++) {
    x[i] = i + $606729666_cnt
  }
  $606729666_state.something.set(x)
  window.requestAnimationFrame($606729666_goCanvas)
}
// -------------------------
function $606729666_listen (target, type, stamp) {
  var val = target.compute()
  var i = target.key
  var x =
    Math.sin(val / 5 + $606729666_cnt / 40) * 300 +
    i * 0.02 + 500 +
    Math.cos(val + $606729666_cnt / (40 - i / 1000)) * 10
  var y =
    Math.cos(val / 10) * 300 +
    i * 0.02 + 400 +
    Math.sin(val + $606729666_cnt / (40 - i / 1000)) * 10
  $606729666_context.fillRect(x, y, 1, 1)
}
// -------------------------
var $606729666_tree = $606729666_state.subscribe({ something: { $any: { val: true } } }, $606729666_listen)
// -------------------------
console.log('TREE', $606729666_tree)
console.log('START ' + $606729666_amount)
$606729666_goCanvas()
