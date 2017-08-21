const root = 5381

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
}

const keyToId = (key, id = root) => {
  var i = key.length
  while (i--) {
    id = (id * 33) ^ key.charCodeAt(i)
  }
  return id >>> 0
}

const arrayId = (arr, id = root) => {
  var i = arr.length
  while (i--) {
    id = keyToId(String(arr[i]), id)
  }
  return id
}

const pathToId = (path, id = root) => {
  var i = path.length
  while (i--) {
    id = keyToId(path[i], id)
  }
  return id
}

const pathToIds = (path, id = root) => {
  var i = path.length
  const ids = new Array(i)
  while (i--) {
    ids[i] = id = keyToId(path[i], id)
  }
  return ids
}

const getFromLeaves = (branch, id) => {
  if (branch.leaves[id]) {
    const leaf = branch.leaves[id]
    leaf.id = id
    leaf.branch = branch
    return branch
  }
}

const get = (branch, key, id) => {
  id = keyToId(key, id)
  return getFromLeaves(branch, id)
}

const getApi = (branch, path, id = root) => {
  if (Array.isArray(path)) {
    // implement get path here
  } else {
    return get(branch, path, id)
  }
}

const setVal = (target, val, stamp, id, branch) => {
  target.val = val
}

const set = (target, val, stamp, id, branch) => {
  if (typeof val === 'object') {
    if (!val) {
      // is null
    } else if (Array.isArray(val)) {
      if (val[0] === '@') {
        console.log('is reference')
        // can totally be a leaf object
      }
    } else if (val.isLeaf) {
      console.log('is ref directly')
      // console.log('need to check if part of same struct -- but later')
    } else {
      let keys
      for (let key in val) {
        if (key === 'val') {
          setVal(target, val.val, stamp, id, branch)
        } else {
          const leafId = keyToId(key, id)
          if (!keys) keys = []
          keys.push(leafId)
          branch.leaves[leafId] = new Leaf(val[key], stamp, leafId, id, branch)
        }
        // set subStamp and stuff as well
      }
      if (keys) {
        if (target.keys) {
          const existing = branch.arrays[target.keys]
          const combined = new Array(existing.length + keys.length)
          const eL = existing.length
          let i = eL
          while (i--) {
            combined[i] = existing[i]
          }
          i = combined.length
          while (i-- > eL) {
            combined[i] = keys[i]
          }
          keys = combined
        }
        const keysId = arrayId(keys)
        target.keys = keysId
        if (!branch.arrays[keysId]) {
          branch.arrays[keysId] = keys
        }
      }
    }
  } else {
    setVal(target, val, stamp, id, branch)
  }
}

// constructor that you can extend

const Leaf = function (val, stamp, id, parent, branch) {
  if (parent) {
    this.p = parent
  }
  // this.id = id // nessecary if you want to support an api - but slow maybe set when needed
  // subscriptions can cache their id / key hashes
  if (val !== void 0) {
    set(this, val, stamp, id, branch)
  }
}

const leaf = Leaf.prototype

define(leaf, 'get', function (key) {
  return getApi(this.branch, key, this.id)
})

define(leaf, 'parent', function () {
  return getFromLeaves(this.branch, this.p)
})

define(leaf, 'isLeaf', true)

const Struct = function (val, stamp, arrays, strings) {
  this.leaves = {}
  this.realKeys = {} // what is this?
  this.arrays = arrays || {}
  this.strings = strings || {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.leaves[root] = new Leaf(val, stamp, root, false)
  this.leaves[root].branch = this
  // same here needs constructor / props
}

const struct = Struct.prototype

define(struct, 'set', function (val, stamp) {
  set(this.leaves[root], val, stamp, root, this)
})

define(struct, 'get', function (path) {
  // do array etc
  return getApi(this, path)
})

export { Leaf, Struct, get }
