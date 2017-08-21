import { addToArrays, getArray, concatToArray, addToStrings, getString } from './cache'
import { root, keyToId, arrayId } from './id'
import { getFromLeaves, getByKey, getByPath, getApi } from './get'
import { compute, inspect, serialize } from './fn'

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
}

const setVal = (target, val, stamp, id, branch) => {
  target.val = val
}

const findReference = (target, val, stamp, id, branch) =>
  set(target, getByPath(branch, val.slice(1), root, {}, stamp), stamp, id, branch)

const setReference = (target, val, stamp, id, branch) => {
  target.rT = val.id
  let rF = [ id ]
  if (val.rF) {
    rF = concatToArray(getArray(val.rF), rF)
  }
  val.rF = arrayId(rF)
  addToArrays(val.rF, rF)
}

const set = (target, val, stamp, id, branch) => {
  if (typeof val === 'object') {
    if (!val) {
      // is null
    } else if (Array.isArray(val)) {
      if (val[0] === '@') {
        findReference(target, val, stamp, id, branch)
      }
    } else if (val.isLeaf) {
      if (branch === val.branch) {
        setReference(target, val, stamp, id, branch)
      } else {
        throw('Reference must be in same branch')
      }
    } else {
      let keys
      for (let key in val) {
        if (key === 'val') {
          setVal(target, val.val, stamp, id, branch)
        } else {
          const leafId = keyToId(key, id)
          const keyId = keyToId(key)
          addToStrings(keyId, key)
          if (!keys) keys = []
          keys.push(leafId)
          branch.leaves[leafId] = new Leaf(val[key], stamp, leafId, branch, id, keyId)
        }
        // set subStamp and stuff as well
      }
      if (keys) {
        if (target.keys) {
          keys = concatToArray(getArray(target.keys), keys)
        }
        target.keys = arrayId(keys)
        addToArrays(target.keys, keys)
      }
    }
  } else {
    setVal(target, val, stamp, id, branch)
  }
}

// constructor that you can extend

const Leaf = function (val, stamp, id, branch, parent, key) {
  if (parent) {
    this.p = parent
  }
  if (key) {
    this.key = key
  }
  // this.id = id // nessecary if you want to support an api - but slow maybe set when needed
  // subscriptions can cache their id / key hashes
  if (val !== void 0) {
    set(this, val, stamp, id, branch)
  }
}

const leaf = Leaf.prototype

define(leaf, 'get', function (path) {
  return getApi(this.branch, path, this.id)
})

define(leaf, 'compute', function () {
  return compute(this.branch, this)
})

define(leaf, 'parent', function () {
  return getFromLeaves(this.branch, this.p)
})

define(leaf, 'root', function () {
  return this.branch.leaves[root]
})

define(leaf, 'inspect', function () {
  return inspect(this.branch, this)
})

define(leaf, 'serialize', function () {
  return serialize(this.branch, this)
})

define(leaf, 'path', function () {
  let parent = this
  const path = []
  while (parent && parent.id !== root) {
    path.unshift(getString(parent.key))
    parent = getFromLeaves(this.branch, parent.p)
  }
  return path
})

define(leaf, 'isLeaf', true)

const Struct = function (val, stamp) {
  this.leaves = {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.leaves[root] = new Leaf(val, stamp, root, this)
  this.leaves[root].branch = this
  // same here needs constructor / props
}

const struct = Struct.prototype

define(struct, 'set', function (val, stamp) {
  set(this.leaves[root], val, stamp, root, this)
})

define(struct, 'get', function (path) {
  return getApi(this, path)
})

define(struct, 'parent', function () {
  return void 0
})

define(struct, 'root', function () {
  return this.leaves[root]
})

define(struct, 'inspect', function () {
  return inspect(this, this.leaves[root])
})

define(struct, 'serialize', function () {
  return serialize(this, this.leaves[root])
})

define(struct, 'path', function () {
  return []
})

export { Leaf, Struct, getByKey, getApi }
