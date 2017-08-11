import hash from 'string-hash'

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, {
    value: val
  })
}

const puid = (arr) => {
  // for each in arr
  // var id = 5381
  // id = id * 33 ^ (hash(key))
  // id >>> 0
}

const Leaf = function (val, stamp, parent) {

}

const leaf = Leaf.prototype

leaf.parent = 0
leaf.val = 0
leaf.stamp = 0
leaf.subStamp = 0
leaf.referenceTo = 0
leaf.referencesFrom = 0
leaf.keys = 0
leaf.branch = false
// constructor field

define(leaf, 'set', function (val, stamp) {

})

const Struct = function () {
  this.leafes = {}
  this.arrays = {}
  this.val = {}
  this.branches = []
  this.self = new Leaf()
  // same here needs constructor / props

  this.leaves[5381] = this.leaf
}

Struct.prototype.set = function (val, stamp) {
  this.self.set(val, stamp)
}

Struct.prototype.get = function (val) {
 // do a set

}

export { Leaf, Struct }
