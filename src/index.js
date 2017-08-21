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

const keysToId = (keys, id = root) => {
  var i = keys.length
  while (i--) {
    id = keyToId(String(keys[i]), id)
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

const get = (branch, key, id) => {
  id = keyToId(key, id)
  const leaf = branch.leaves[id]
  leaf.branch = branch
  leaf.id = id
  return leaf
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
          branch.leaves[leafId] = new Leaf(val[key], stamp, id, leafId, branch)
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
        const keysId = keysToId(keys)
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

const Leaf = function (val, stamp, parent, id, branch) {
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
  return get(this.branch, key, this.id)
})

define(leaf, 'parent', function () {
  return this.branch.leaves[this.p]
})

define(leaf, 'isLeaf', true)

const Struct = function (val, stamp, arrays, strings) {
  this.leaves = {}
  this.realKeys = {}
  this.arrays = arrays || {}
  this.strings = strings || {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.leaves[root] = new Leaf(val, stamp, false, root)
  this.leaves[root].branch = this
  // same here needs constructor / props
}

const struct = Struct.prototype

define(struct, 'set', function (val, stamp) {
  set(this.leaves[root], val, stamp, root, this)
})

define(struct, 'get', function (key) {
  // do array etc
  return get(this, key)
})

export { Leaf, Struct }
