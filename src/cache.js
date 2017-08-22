const arrays = {}
const strings = {}

const addToArrays = (id, arr) => {
  if (arrays[id]) {
    return true
  } else {
    arrays[id] = arr
  }
}

const getArray = id => {
  return arrays[id]
}

const concatToArray = (existing, add) => {
  const combined = new Array(existing.length + add.length)
  const eL = existing.length
  var i = eL
  while (i--) {
    combined[i] = existing[i]
  }
  i = combined.length
  var j = 0
  while (i-- > eL) {
    combined[i] = add[j++]
  }
  return combined
}

const addToStrings = (id, str) => {
  if (strings[id]) {
    return true
  } else {
    strings[id] = str
  }
}

const getString = id => {
  return strings[id]
}

export { addToArrays, getArray, concatToArray, addToStrings, getString }
