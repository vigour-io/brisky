var $2180032073 = require('string-hash')
;

const $3404267062_define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val })
}

const $3404267062_puid = (arr) => {
  // for each in arr
  // var id = 5381
  // id = id * 33 ^ (hash(key))
  // id >>> 0
}

const $3404267062_Leaf = function (val, stamp, parent) {

}

const $3404267062_leaf = $3404267062_Leaf.prototype

$3404267062_leaf.parent = 0
$3404267062_leaf.val = 0
$3404267062_leaf.stamp = 0
$3404267062_leaf.subStamp = 0
$3404267062_leaf.referenceTo = 0
$3404267062_leaf.referencesFrom = 0
$3404267062_leaf.keys = 0
$3404267062_leaf.branch = false
// constructor field

$3404267062_define($3404267062_leaf, 'set', function (val, stamp) {

})

const $3404267062_Struct = function () {
  this.leafes = {}
  this.arrays = {}
  this.val = {}
  this.branches = []
  this.self = new $3404267062_Leaf()
  // same here needs constructor / props

  this.leafes[5381] = this.leaf
}

const $3404267062_struct = $3404267062_Struct.prototype

$3404267062_define($3404267062_struct, 'set', function (val, stamp) {
  this.self.set(val, stamp)
})

$3404267062_define($3404267062_struct, 'get', function (val) {
 // do a set

})



var $3404267062_$ALL$ = {
  Leaf: $3404267062_Leaf,
  Struct: $3404267062_Struct
}

module.exports = $3404267062_$ALL$