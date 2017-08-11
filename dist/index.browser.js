var $2180032073 = require('string-hash')
;

const $3404267062_define = (obj, key, val) => {
  Object.defineProperty(obj, key, {
    value: val
  })
}

const $3404267062_puid = t => {
  var id = 5381
  var p = t
  if (t._c) {
    while (p) {
      let key = p.key
      if (key !== void 0) {
        id = id * 33 ^ ($2180032073(key))
        p = p._cLevel === 1 ? p._c : p._p
      } else {
        return id >>> 0
      }
    }
    return id >>> 0
  } else if (t._puid) {
    return t._puid
  } else {
    while (p) {
      let key = p.key
      if (key !== void 0) {
        id = id * 33 ^ ($2180032073(key))
        p = p._p
      } else {
        return (t._puid = id >>> 0)
      }
    }
    return (t._puid = id >>> 0)
  }
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
  this.leaves = {}
  this.arrays = {}
  this.val = {}
  this.branches = []
  this.self = new $3404267062_Leaf()
  // same here needs constructor / props

  this.leaves[5381] = this.leaf
}

$3404267062_Struct.prototype.set = function (val, stamp) {
  this.self.set(val, stamp)
}

$3404267062_Struct.prototype.get = function (val) {
 // do a set

}



var $3404267062_$ALL$ = {
  Leaf: $3404267062_Leaf,
  Struct: $3404267062_Struct
}

module.exports = $3404267062_$ALL$