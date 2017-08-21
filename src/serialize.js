import { getArray, getString } from './cache'
import { getFromLeaves } from './get'

const inspect = (branch, leaf) => {
  var val = leaf.val
  var keys = leaf.keys && getArray(leaf.keys)
  const start = 'Struct ' + (leaf.key ? getString(leaf.key) + ' ' : '')
  const origin = leaf.rT && getFromLeaves(branch, leaf.rT)
  if (origin) {
    val = inspect(branch, origin)
  }
  if (keys) {
    if (keys.length > 10) {
      const len = keys.length
      keys = keys.slice(0, 5).map(keyId => {
        const leaf = getFromLeaves(branch, keyId)
        return getString(leaf.key)
      })
      keys.push('... ' + (len - 5) + ' more items')
    } else {
      keys = keys.map(keyId => {
        const leaf = getFromLeaves(branch, keyId)
        return getString(leaf.key)
      })
    }
    return val
      ? `${start}{ val: ${val}, ${keys.join(', ')} }`
      : `${start}{ ${keys.join(', ')} }`
  } else {
    return val
      ? `${start}{ val: ${val} }`
      : `${start}{ }`
  }
}

const serialize = (branch, leaf, fn) => {
  var result = {}
  var val = leaf.val
  const keys = leaf.keys && getArray(leaf.keys)
  const origin = leaf.rT && getFromLeaves(branch, leaf.rT)
  if (origin) {

  }
  if (val && typeof val === 'object' && val.inherits) {
    const p = path(val) // memoized paths later
    val = [ '@', 'root' ]
    let i = p.length
    while (i--) { val[i + 2] = p[i] }
    if (t.root().key) {
      val.splice(2, 1)
    }
  }
  if (keys) {
    let onlyNumbers = true
    for (let i = 0, len = keys.length; i < len; i++) {
      let key = keys[i]
      let keyResult = serialize(get(t, key), fn)
      if (isNaN(key)) onlyNumbers = false
      if (keyResult !== void 0) { result[key] = keyResult }
    }
    if (val !== void 0) {
      result.val = val
    } else if (onlyNumbers) {
      const arr = []
      for (let i in result) arr[i] = result[i]
      result = arr
    }
  } else if (val !== void 0) {
    result = val
  }
  return fn ? fn === true ? compute(t, result) : fn(t, result) : result
}

export { inspect, serialize }
