import hash from 'string-hash'

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
}

// const puid = (arr) => {
  // for each in arr
  // var id = 5381
  // id = id * 33 ^ (hash(key))
  // id >>> 0
// }

const Leaf = function (val, stamp, parent, id, branch) {
  if (parent) {
    this.parent = parent
  }
  if (val !== void 0) {
    // set(this, val, stamp, id, branch)
  }
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

// also make a fast set using puid

// const create = (target, val, stamp, id, branch) => {

// }

const set = (target, val, stamp, id, branch) => {
  if (typeof val === 'object') {
    if (!val) {
      // is null
    } else if (val.constructor === Array) {

    } else {
      for (let key in val) {
        const leafId = (id * 33 ^ (hash(key))) >>> 0
        branch.leaves[leafId] = new Leaf(val, stamp, id, leafId, branch)
        // set subStamp and stuff as well
      }
    }
  }
}

const Struct = function (val, stamp, arrays) {
  this.leaves = {}
  this.arrays = arrays || {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.self = this.leaves[5381] = new Leaf(val)
  // same here needs constructor / props
}

const struct = Struct.prototype

define(struct, 'set', function (val, stamp) {
  set(this.self, val, stamp, 5381, this)
})

define(struct, 'get', function (val) {
 // do a set

})

export { Leaf, Struct }
