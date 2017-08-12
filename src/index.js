import stringHash from 'string-hash'

const define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
}


var murmurHash3 = require("murmurhash3js");


console.log(murmurHash3.x86.hash128("My hovercraft is full of eels.", 25))

// const puid = (arr) => {
  // for each in arr
  // var id = 5381
  // id = id * 33 ^ (hash(key))
  // id >>> 0
// }

// if you want to support a get from a leaf itself it needs its id which is a bit lame

// same as strign hash but check for number as well to opt mem
const seed = 5381

const numEscape = seed * 33
const keyToId = key => {
  // const numkey = ~~key
  return murmurHash3.x86.hash32(key)
  // if (numkey) {
  //   // do something a bit different then charcode at avoid colish
  //   return numEscape ^ ((numEscape * 33) ^ numkey)
  // } else {
    // let i = key.length
    // let id = seed
    // while (i) {
    //   id = (id * 33) ^ key.charCodeAt(--i)
    // }
    // return id >>> 0
  // }
}

// var md5sum = crypto.createHash('md5');

// console.log('lullz', md5sum)


// can use a check if id exists if parent === else know its my own generate new hash

const pushId = (id, keyId) => {
  // var name = 'braitsch';
  // var hash = crypto.createHash('md5')
  //   .update(name)
  //   .digest('hex');
  // return crypto.createHash('md5').update(id).update(keyId).digest('hex')
  // murmurHash3.x86.hash32(
  return murmurHash3.x86.hash32(id + '' + keyId)
  // id will become just number
  // you can make paths smarter like
  // if(id) && id[keyID]
  // else
  // id = (id * 33) ^ keyId
  // return murmurHash3.x86.hash32(id)
  // return id >>> 0
}

const arrayToId = (arr, id) => {
  let i = arr.length
  while (i) {
    id = (id * 33) ^ stringHash(arr[--i])
  }
  return id >>> 0
  // return arr.toString()
}

const getFromLeaves = (id, branch) => {
  return branch.leaves[id]
}

const getRaw = (id, key, branch) => {
  id = pushId(id, keyToId(key))
  return branch.leaves[id]
}

const get = (id, key, branch) => {
  console.log(key)

  id = pushId(id, keyToId(key))
  console.log(id)
  const f = branch.leaves[id]
  if (!f) { return }
  // f.id = id // set this sporatidcly
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
    } else if (Array.isArray(val)) {
      if (val[0] === '@') {
        console.log('is reference')
        // can totally be a leaf object
      }
    } else if (val.isLeaf) {
      console.log('is ref directly')
      // console.log('need to check if part of same struct -- but later')
    } else {
      let newArray
      for (let key in val) {
        if (key === 'val') {
          setVal(target, val.val, stamp, id, branch)
        } else {
          const keyId = keyToId(key)
          const leafId = pushId(id, keyId)
          // if (!newArray) newArray = {}
          if (!newArray) newArray = []
          // newArray[keyId] = true
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

// constructor that you can extend

const Leaf = function (val, stamp, parent, id, branch) {
  if (parent) {
    this.p = parent
  }
  this.id = id
  // this.id = id // nessecary if you want to support an api - but slow maybe set when needed
  // subscriptions can cache their id / key hashes
  if (val !== void 0) {
    set(this, val, stamp, id, branch)
  }
}

const leaf = Leaf.prototype

define(leaf, 'get', function (key) {
  return get(this.id, key, this.branch)
})

define(leaf, 'parent', function (key) {
  return getFromLeaves(this.p, this.branch)
})

define(leaf, 'isLeaf', true)

const Struct = function (val, stamp, arrays, strings) {
  this.leaves = {}
  this.realkeys = {}
  this.arrays = arrays || {}
  this.strings = strings || {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.self = this.leaves[seed] = new Leaf(val, stamp, false, seed)
  this.leaves[seed].branch = this
  // same here needs constructor / props
}

const struct = Struct.prototype

define(struct, 'set', function (val, stamp) {
  set(this.self, val, stamp, seed, this)
})

define(struct, 'get', function (key) {
  // do array etc
  return get(seed, key, this)
})

export { Leaf, Struct, getRaw }
