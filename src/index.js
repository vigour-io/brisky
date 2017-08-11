import hash from 'string-hash'

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, {
    value: val
  })
}

const puid = t => {
  var id = 5381
  var p = t
  if (t._c) {
    while (p) {
      let key = p.key
      if (key !== void 0) {
        id = id * 33 ^ (hash(key))
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
        id = id * 33 ^ (hash(key))
        p = p._p
      } else {
        return (t._puid = id >>> 0)
      }
    }
    return (t._puid = id >>> 0)
  }
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
  this.leaves = {}
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
