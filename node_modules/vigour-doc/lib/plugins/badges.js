'use strict'

var _trim = require('lodash.trim')
var _merge = require('lodash.merge')
var makeBadges = require('vigour-doc-badges')
var Vdoc = require('../')

module.exports = exports = function badges (entries, i, j, pkg) {
  var info = pkg.repository.url.match(/\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)/)
  if (!info) {
    let error = new Error('Invalid package.json')
    error.todo = 'Make sure your package.json contains a `repository.url` field'
    error.documentation = 'https://docs.npmjs.com/files/package.json#repository'
    throw error
  }
  var defaultParams = {
    owner: info[1],
    repo: info[2],
    package: pkg.name
  }
  var file = entries[i].path
  var placeholder = entries[i].found[j].matches[0]
  var command = entries[i].found[j].matches[2]
  var options = command.split(';').map((item) => {
    item = _trim(item)
    var ms = item.match(/\((.*)\)/)
    var ret = {}
    if (ms) {
      var badge = item.replace(ms[0], '')
      var paramStr = ms[1]
      try {
        var params = JSON.parse(paramStr)
      } catch (e) {
        let error = new Error('Invalid JSON')
        error.file = file
        error.badge = badge
        error.str = paramStr
        throw error
      }
      ret[badge] = _merge(defaultParams, params)
      return ret
    } else {
      ret[item] = defaultParams
      return ret
    }
  }).reduce((prev, curr) => {
    return _merge(prev, curr)
  }, {})
  var replacement = makeBadges(options)
  var newContents = entries[i].contents.replace(placeholder,
      placeholder +
      Vdoc.prototype.mdCommentStart + '\n' +
      replacement +
      Vdoc.prototype.mdCommentEnd)
  return newContents
}
