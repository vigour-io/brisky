const root = 5381

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

export { root, keyToId, arrayId, pathToId, pathToIds }
