'use strict'

var Vdoc = require('.')

module.exports = exports = function clean (mdFiles, i) {
  var newContents = mdFiles[i].contents.replace(Vdoc.prototype.generatedRE, '')
  return newContents
}
