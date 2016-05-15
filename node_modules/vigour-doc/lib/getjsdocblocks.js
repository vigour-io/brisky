'use strict'

module.exports = exports = function getJsdocBlocks (str) {
  var re = new RegExp(exports.re, 'g')
  var out = {}
  var matches = re.exec(str)
  if (matches === null) {
    return {}
  }
  while (matches) {
    out[matches[3]] = matches[0]
    matches = re.exec(str)
  }
  return out
}

exports.re = '\\/\\*\\*(([\\s\\S][^/\\*\\*])?)\\*\\s*@id\\s+(.+?)\\n([\\s\\S]+?)\\*\\/'
