const getPathIdOld = path => {
  var i = path.length
  var hash = 5381
  while (i--) {
    let j = path[i].length
    while (j) {
      hash = (hash * 33) ^ path[i].charCodeAt(--j)
    }
  }

  return hash >>> 0
}

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

// Prepare for performance test
var pathList = []
const path = ['Lorem', 'ipsum', 'dolor', 'sit']
var i = 3e6
while (i--) {
  pathList.push(path.map(k => k + i))
}

d = Date.now()
pathList.forEach(getPathIdOld)
d = Date.now() - d
console.log(`getPathIdOld ${d}ms`)

d = Date.now()
pathList.forEach(getPathId)
d = Date.now() - d
console.log(`getPathId ${d}ms`)

// Prepare for collusion test
pathList = []
i = 3e6
while(i--) {
  pathList.push([String(i)])
}

var collusion = {}
var count = 0
pathList.forEach(path => {
  const id = getPathIdOld(path)
  if (collusion[id]) {
    count++
  } else {
    collusion[id] = true
  }
})
console.log('getPathIdOld collusion count', count)

collusion = {}
count = 0
pathList.forEach(path => {
  const id = getPathId(path)
  if (collusion[id]) {
    count++
  } else {
    collusion[id] = true
  }
})
console.log('getPathId collusion count', count)
