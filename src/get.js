import { root, keyToId, pathToId, pathToIds } from './id'
import { origin } from './fn'

const getFromLeaves = (branch, id) => {
  if (branch.leaves[id]) {
    const leaf = branch.leaves[id]
    leaf.id = id
    leaf.branch = branch
    return leaf
  }
}

const getByKey = (branch, key, id = root) => {
  id = keyToId(key, id)
  return getFromLeaves(branch, id)
}

const getByPath = (branch, path, id = root, val, stamp) => {
  return getFromLeaves(branch, pathToId(path, id))
}

const getApi = (branch, path, id = root, val, stamp) => {
  if (Array.isArray(path)) {
    const ids = pathToIds(path, id)
    let i = ids.length - 1
    let leaf = getFromLeaves(branch, ids[i])
    if (leaf) {
      return origin(branch, leaf) || leaf
    } else {
      while (i) {
        let leaf = getFromLeaves(branch, ids[i])
        if (leaf && (leaf = origin(branch, leaf))) {
          return getApi(branch, path.slice(i + 1), leaf.id, val, stamp)
        }
        i--
      }
    }
  } else {
    return getByKey(branch, path, id)
  }
}

export { getFromLeaves, getByKey, getByPath, getApi }
