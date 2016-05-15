# vigour-fs-promised
vigour-fs, but methods return promises

## Usage

Same as vigour-fs, or append `Async` to the method name to get a promise instead

```javascript
var fs = require('vigour-fs-promised')
// node-style callbacks still work
fs.exists(__filename, function (err, exists) {
  // err === null
  // exists === true
})
// Get a promise with the `Async` suffix
fs.existsAsync(__filename)
  .then(function (exists) {
    // exists === true
  })
```
