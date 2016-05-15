var fs = module.exports = require('vigour-fs')
var Promise = require('bluebird')

Promise.promisifyAll(fs)
