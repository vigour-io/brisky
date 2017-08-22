import { getString } from './cache'
import { root } from './id'
import { getFromLeaves, getByKey, getApi } from './get'
import { set } from './manipulate'
import { compute, inspect, serialize } from './fn'

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
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

define(leaf, 'set', function (val, stamp) {
  set(this, val, stamp, this.id, this.branch)
})

define(leaf, 'get', function (path, val, stamp) {
  return getApi(this.branch, path, this.id, val, stamp)
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

const Struct = function (val, stamp, inherits) {
  this.leaves = {}
  this.branches = []
  if (inherits) {
    this.inherits = inherits
  }
  // just added to leaves if you want to make a ref to the root :/
  this.leaves[root] = new Leaf(val, stamp, root, this)
  this.leaves[root].branch = this
  // same here needs constructor / props
}

const struct = Struct.prototype

define(struct, 'set', function (val, stamp) {
  set(this.leaves[root], val, stamp, root, this)
})

define(struct, 'get', function (path, val, stamp) {
  return getApi(this, path, root, val, stamp)
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
