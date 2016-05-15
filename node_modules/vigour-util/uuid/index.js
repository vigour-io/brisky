'use strict'
var hash = require('../hash')
var rand = ~~(Math.random() * 10000)
var stamp = Date.now()
exports.val = hash('n-' + process.pid + '-' + stamp + '-' + rand)
