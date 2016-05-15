'use strict'

var http = require('http')

module.exports = exports = function (url) {
  return new Promise(function (resolve, reject) {
    var req = http.get(url, function (res) {
      var total = ''
      res.on('error', reject)
      res.on('data', function (chunk) {
        total += chunk.toString()
      })
      res.on('end', function () {
        resolve(total)
      })
    })
    req.on('error', reject)
  })
}
