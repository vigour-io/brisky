'use strict'

var _trim = require('lodash.trim')
var jsdoc2md = require('vigour-jsdoc2md')
var Vdoc = require('../')

module.exports = exports = function jsdoc (entries, i, j, pkg, blocks) {
  var placeholder = entries[i].found[j].matches[0]
  var id = _trim(entries[i].found[j].matches[2])
  if (!blocks[id]) {
    console.log('WARNING', 'jsdoc id `' + id + '` not found, skipping.')
    return entries[i].contents
  }

  var replacement = jsdoc2md(blocks[id])
  var newContents = entries[i].contents.replace(placeholder,
    placeholder +
    Vdoc.prototype.mdCommentStart + '\n' +
    replacement +
    Vdoc.prototype.mdCommentEnd)
  return newContents
}
