import stringHash from 'string-hash'

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
}

// const puid = (arr) => {
  // for each in arr
  // var id = 5381
  // id = id * 33 ^ (hash(key))
  // id >>> 0
// }

// if you want to support a get from a leaf itself it needs its id which is a bit lame

// same as strign hash but check for number as well to opt mem
const keyToId = key => {
  const numkey = ~~key
  if (numkey) {
    // do something a bit different then charcode at avoid colish
    return (5381 * 33) ^ ((5381 * 33) ^ numkey)
  } else {
    let i = key.length
    let id = 5381
    while (i) {
      id = (id * 33) ^ key.charCodeAt(--i)
    }
    return id >>> 0
  }
}

const insertId = (keyId, id) => {
  id = (id * 33) ^ keyId
  return id >>> 0
}

const arrayToId = (arr, id) => {
  let i = arr.length
  while (i) {
    id = (id * 33) ^ keyToId(arr[--i])
  }
  return id >>> 0
}

const get = (id, key, branch) => {
  id = insertId(id, keyToId(key))
  const f = branch.leaves[id]
  if (!f) {
    return
  }
  f.id = id
  f.branch = branch
  return f
}

// var cnt = 0

const setVal = (target, val, stamp, id, branch) => {
  target.val = val
}

const set = (target, val, stamp, id, branch) => {
  if (typeof val === 'object') {
    if (!val) {
      // is null
    } else if (val.constructor === Array) {

    } else {
      let newArray
      for (let key in val) {
        if (key === 'val') {
          setVal(target, val.val, stamp, id, branch)
        } else {
          const keyId = keyToId(key)
          const leafId = insertId(id, keyId)
          if (!newArray) newArray = []
          // can use keys or keyids
          // cache can just safe keys
          // key id is used here and can be recalulated
          // if (key === 'a' || key === 'c' || key === 'b') {
          //   console.log(key, keyId, leafId, id)
          // }
          // if (key === 'c') {
          //   throw new Error()
          // }
          newArray.push(keyId)
          branch.leaves[leafId] = new Leaf(val[key], stamp, id, leafId, branch)
        }
        // set subStamp and stuff as well
      }
      if (newArray) {
        if (!target.keys) {
          // arrays can be shared if you walk them witht his operation (id * 33 ^ keyId) >>> 0
          const arrayId = arrayToId(newArray)
          target.keys = arrayId
          if (!branch.arrays[arrayId]) {
            branch.arrays[arrayId] = newArray
          }
        } else {
          // insert make new
        }
      }
    }
  } else {
    setVal(target, val, stamp, id, branch)
  }
}

const Leaf = function (val, stamp, parent, id, branch) {
  if (parent) {
    this.parent = parent
  }
  // this.id = id // nessecary if you want to support an api
  if (val !== void 0) {
    set(this, val, stamp, id, branch)
  }
}

const leaf = Leaf.prototype

define(leaf, 'get', function (key) {
  return get(this.id, key, this.branch)
})

const Struct = function (val, stamp, arrays, strings) {
  this.leaves = {}
  this.realkeys = {}
  this.arrays = arrays || {}
  this.strings = strings || {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.self = this.leaves[5381] = new Leaf(val)
  // same here needs constructor / props
}

const struct = Struct.prototype

define(struct, 'set', function (val, stamp) {
  set(this.self, val, stamp, 5381, this)
})

define(struct, 'get', function (key) {
  // do array etc
  return get(5381, key, this)
})

export { Leaf, Struct }
