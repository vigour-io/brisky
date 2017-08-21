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
  let i = eL
  while (i--) {
    combined[i] = existing[i]
  }
  i = combined.length
  while (i-- > eL) {
    combined[i] = add[i]
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
