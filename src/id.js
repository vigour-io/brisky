const root = 5381

const keyToId = (key, id = root) => {
  if (!key.length) {
    key = '' + key
  }
  var i = key.length
  var hash2 = (id % root) + 52711
  while (i--) {
    const char = key.charCodeAt(i)
    id = (id * 33) ^ char
    hash2 = (hash2 * 33) ^ char
  }
  return (id >>> 0) * 52711 + (hash2 >>> 0)
}

const arrayId = (arr, id = root) => {
  var i = arr.length
  while (i--) {
    id = keyToId(arr[i], id)
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
    ids[i] = id = keyToId(String(path[i]), id)
  }
  return ids
}

export { root, keyToId, arrayId, pathToId, pathToIds }
