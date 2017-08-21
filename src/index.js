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
  const pL = path.length
  let i = -1
  while (++i < pL) {
    id = keyToId(path[i], id)
  }
  return id
}

const pathToIds = (path, id = root) => {
  const pL = path.length
  const ids = new Array(pL)
  let i = -1
  while (++i < pL) {
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

const getApi = (branch, path, id = root, val, stamp) => {
  if (Array.isArray(path)) {
    const ids = pathToIds(path, id)
    let i = ids.length - 1
    const leaf = getFromLeaves(branch, ids[i])
    if (leaf) {
      return leaf
    } else {
      // time to check for refs
      while (i) {
        const leaf = getFromLeaves(branch, ids[i])
        if (leaf) {
          // check refTo
        }
        i--
      }
    }
  } else {
    return get(branch, path, id)
  }
}

const setVal = (target, val, stamp, id, branch) => {
  target.val = val
}

const setReference = (target, val, stamp, id, branch) => {
  target.rT = val.id
  if (val.rF) {
    val.rF.push(id)
  } else {
    val.rF = [ id ]
  }
}

const reference = (target, val, stamp, id, branch) =>
  set(target, getApi(branch, val.slice(1), id, {}, stamp), void 0, id, branch)

const set = (target, val, stamp, id, branch) => {
  if (typeof val === 'object') {
    if (!val) {
      // is null
    } else if (Array.isArray(val)) {
      if (val[0] === '@') {
        reference(target, val, stamp, id, branch)
      }
    } else if (val.isLeaf) {
      if (target.branch === val.branch) {
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
