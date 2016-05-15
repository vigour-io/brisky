'use strict'

var fs = require('vigour-fs-promised')
var getMdPlaceholders = require('./getmdplaceholders')
var getJsdocBlocks = require('./getjsdocblocks')

module.exports = exports = function processFile (jsdocBlocks, mdFiles) {
  return function (pth) {
    var end = pth.slice(pth.lastIndexOf('.') + 1)
    if (end === 'md') {
      return fs.readFileAsync(pth, 'utf8')
        .then((contents) => {
          var placeholders = getMdPlaceholders(contents)
          if (placeholders) {
            mdFiles.push({
              path: pth,
              contents: contents,
              found: placeholders
            })
          }
        })
    }
    if (end === 'js' || end === 'less' || end === 'css' || end === 'scss' || end === 'sass') {
      return fs.readFileAsync(pth, 'utf8')
        .then((contents) => {
          var blocks = getJsdocBlocks(contents)
          for (let key in blocks) {
            if (jsdocBlocks[key]) {
              let error = new Error('same ID (' + key + ') found multiple times in ' + jsdocBlocks[key].file + ' and ' + pth)
              error.files = [jsdocBlocks[key].file, pth]
              error.id = key
              throw error
            } else {
              jsdocBlocks[key] = blocks[key]
            }
          }
        })
    }
  }
}
