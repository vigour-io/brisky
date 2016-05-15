'use strict'

var path = require('path')
var pathFinder = /\((.*?):.*\)/

module.exports = function findPackage (pkgPath) {
  if (!pkgPath) {
    var stack = new Error().stack.split('\n')
    var filePath = stack[3].match(pathFinder)
    if (filePath) {
      pkgPath = path.resolve(filePath[1], '..')
    } else {
      pkgPath = process.cwd() // other option: require.main.filename
    }
  }

  pkgPath += '/package.json'
  var lastPath
  var pkg

  while (pkgPath !== lastPath) {
    lastPath = pkgPath
    try {
      pkg = require(pkgPath)
      break
    } catch (err) {}

    pkgPath = path.resolve(pkgPath, '../../package.json')
  }

  return pkg
}
