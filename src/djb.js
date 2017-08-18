const djb2 = str => {
  var i = str.length
  var hash = 5381
  while (i--) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }

  return hash >>> 0
}

const djb3 = str => {
  var i = str.length
  var hash1 = 5381
  var hash2 = 52711
  while (i--) {
    const chr = str.charCodeAt(i)
    hash1 = (hash1 * 33) ^ chr
    hash2 = (hash2 * 33) ^ chr
  }

  return (hash1 >>> 0) * 648391 + (hash2 >>> 0)
}

const n = 6e7 // 60 million

var collision = Array(n)
var count = 0
i = n
var d = Date.now()
while (i--) {
  collision[i] = djb2(String(i))
}
d = Date.now() - d
console.log(`djb2 ${d}ms`)
collision.sort((a, b) => {
  if (a === b) {
    count++
  }
  return a - b
})
console.log(`djb2 collision count ${count}`)

collision = Array(n)
count = 0
i = n
d = Date.now()
while (i--) {
  collision[i] = djb3(String(i))
}
d = Date.now() - d
console.log(`djb3 ${d}ms`)
collision.sort((a, b) => {
  if (a === b) {
    count++
  }
  return a - b
})
console.log(`djb3 collision count ${count}`)