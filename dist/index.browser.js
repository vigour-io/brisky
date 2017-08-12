var $2180032073 = require('string-hash')
;var $1026693933 = require('crypto')
;var $2934695835 = require('murmurhash3js')
;

const $3404267062_define = (obj, key, val) => {
  Object.defineProperty(obj, key, { value: val, configurable: true })
}


var $3404267062_murmurHash3 = $2934695835;


console.log($3404267062_murmurHash3.x86.hash128("My hovercraft is full of eels.", 25))

// const puid = (arr) => {
  // for each in arr
  // var id = 5381
  // id = id * 33 ^ (hash(key))
  // id >>> 0
// }

// if you want to support a get from a leaf itself it needs its id which is a bit lame

// same as strign hash but check for number as well to opt mem
const $3404267062_seed = 5381

const $3404267062_numEscape = $3404267062_seed * 33
const $3404267062_keyToId = key => {
  // const numkey = ~~key
  // typeof number just teturn it + 5381
  return $3404267062_murmurHash3.x86.hash32(key + '')
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

const $3404267062_pushId = (id, keyId) => {
  // var name = 'braitsch';
  // var hash = crypto.createHash('md5')
  //   .update(name)
  //   .digest('hex');
  // return crypto.createHash('md5').update(id).update(keyId).digest('hex')
  // murmurHash3.x86.hash32(
  return $3404267062_murmurHash3.x86.hash32(id + '' + keyId)
  // id will become just number
  // you can make paths smarter like
  // if(id) && id[keyID]
  // else
  // id = (id * 33) ^ keyId
  // return murmurHash3.x86.hash32(id)
  // return id >>> 0
}

const $3404267062_arrayToId = (arr, id) => {
  let i = arr.length
  while (i) {
    id = (id * 33) ^ $2180032073(arr[--i])
  }
  return id >>> 0
  // return arr.toString()
}

const $3404267062_getFromLeaves = (id, branch) => {
  return branch.leaves[id]
}

const $3404267062_getRaw = (id, key, branch) => {
  id = $3404267062_pushId(id, $3404267062_keyToId(key))
  return branch.leaves[id]
}

const $3404267062_get = (id, key, branch) => {
  console.log(key, $3404267062_keyToId(key), id)

  id = $3404267062_pushId(id, $3404267062_keyToId(key))
  console.log(id)
  const f = branch.leaves[id]
  if (!f) { return }
  // f.id = id // set this sporatidcly
  f.branch = branch
  return f
}

// var cnt = 0

const $3404267062_setVal = (target, val, stamp, id, branch) => {
  target.val = val
}

const $3404267062_set = (target, val, stamp, id, branch) => {
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
          $3404267062_setVal(target, val.val, stamp, id, branch)
        } else {
          const keyId = $3404267062_keyToId(key)
          const leafId = $3404267062_pushId(id, keyId)
          // if (!newArray) newArray = {}
          if (!newArray) newArray = []
          // newArray[keyId] = true
          newArray.push(keyId)
          branch.leaves[leafId] = new $3404267062_Leaf(val[key], stamp, id, leafId, branch)
        }
        // set subStamp and stuff as well
      }
      if (newArray) {
        if (!target.keys) {
          // arrays can be shared if you walk them witht his operation (id * 33 ^ keyId) >>> 0
          const arrayId = $3404267062_arrayToId(newArray)
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
    $3404267062_setVal(target, val, stamp, id, branch)
  }
}

// constructor that you can extend

const $3404267062_Leaf = function (val, stamp, parent, id, branch) {
  if (parent) {
    this.p = parent
  }
  this.id = id
  // this.id = id // nessecary if you want to support an api - but slow maybe set when needed
  // subscriptions can cache their id / key hashes
  if (val !== void 0) {
    $3404267062_set(this, val, stamp, id, branch)
  }
}

const $3404267062_leaf = $3404267062_Leaf.prototype

$3404267062_define($3404267062_leaf, 'get', function (key) {
  return $3404267062_get(this.id, key, this.branch)
})

$3404267062_define($3404267062_leaf, 'parent', function (key) {
  return $3404267062_getFromLeaves(this.p, this.branch)
})

$3404267062_define($3404267062_leaf, 'isLeaf', true)

const $3404267062_Struct = function (val, stamp, arrays, strings) {
  this.leaves = {}
  this.realkeys = {}
  this.arrays = arrays || {}
  this.strings = strings || {}
  this.branches = []
  // just added to leaves if you want to make a ref to the root :/
  this.self = this.leaves[$3404267062_seed] = new $3404267062_Leaf(val, stamp, false, $3404267062_seed)
  this.leaves[$3404267062_seed].branch = this
  // same here needs constructor / props
}

const $3404267062_struct = $3404267062_Struct.prototype

$3404267062_define($3404267062_struct, 'set', function (val, stamp) {
  $3404267062_set(this.self, val, stamp, $3404267062_seed, this)
})

$3404267062_define($3404267062_struct, 'get', function (key) {
  // do array etc
  return $3404267062_get($3404267062_seed, key, this)
})



var $3404267062_$ALL$ = {
  Leaf: $3404267062_Leaf,
  Struct: $3404267062_Struct,
  getRaw: $3404267062_getRaw
}

module.exports = $3404267062_$ALL$