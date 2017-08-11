var $2180032073 = require('string-hash')
;

const $3404267062_define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
}

// const puid = (arr) => {
  // for each in arr
  // var id = 5381
  // id = id * 33 ^ (hash(key))
  // id >>> 0
// }

const $3404267062_Leaf = function (val, stamp, parent, id, branch) {
  if (parent) {
    this.parent = parent
  }
  if (val !== void 0) {
    // set(this, val, stamp, id, branch)
  }
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

// also make a fast set using puid

// const create = (target, val, stamp, id, branch) => {

// }

const $3404267062_set = (target, val, stamp, id, branch) => {
  if (typeof val === 'object') {
    if (!val) {
      // is null
    } else if (val.constructor === Array) {

    } else {
      for (let key in val) {
        const leafId = (id * 33 ^ ($2180032073(key))) >>> 0
        branch.leaves[leafId] = new $3404267062_Leaf(val, stamp, id, leafId, branch)
        // set subStamp and stuff as well
      }
    }
  }
}

const $3404267062_Struct = function (val, stamp, arrays) {
  this.leaves = {}
  this.arrays = arrays || {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.self = this.leaves[5381] = new $3404267062_Leaf(val)
  // same here needs constructor / props
}

const $3404267062_struct = $3404267062_Struct.prototype

$3404267062_define($3404267062_struct, 'set', function (val, stamp) {
  $3404267062_set(this.self, val, stamp, 5381, this)
})

$3404267062_define($3404267062_struct, 'get', function (val) {
 // do a set

})



var $3404267062_$ALL$ = {
  Leaf: $3404267062_Leaf,
  Struct: $3404267062_Struct
}

module.exports = $3404267062_$ALL$