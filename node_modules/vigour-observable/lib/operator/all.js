'use strict'
exports.inject = [
  require('./add'),
  require('./transform'),
  require('./prepend'),
  require('./type')
]
// also inject emit -- we have to emit to parent on data
