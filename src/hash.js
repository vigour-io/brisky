const getPathId = path => {
  var i = path.length
  var hash1 = 5381
  var hash2 = 52711
  while (i--) {
    let j = path[i].length
    while (j) {
      hash1 = (hash1 * 33) ^ path[i].charCodeAt(--j)
      hash2 = (hash2 * 139) ^ path[i].charCodeAt(j)
    }
  }

  return (hash1 & 0x3fffff) * 0x40000000 + (hash2 & 0x3fffffff)
}

var pathList = []
const path = ['Lorem', 'ipsum', 'dolor', 'sit']
var i = 3e6
while (i--) {
  pathList.push(path.map(k => k + i))
}

d = Date.now()
pathList.forEach(getPathId)
d = Date.now() - d

console.log(`pathId ${d}ms`)

pathList = []
i = 3e6
while(i--) {
  pathList.push([String(i)])
}

const collusion = {}
var count = 0
pathList.forEach(path => {
  const id = getPathId(path)
  if (collusion[id]) {
    count++
  } else {
    collusion[id] = true
  }
})

console.log(count)
