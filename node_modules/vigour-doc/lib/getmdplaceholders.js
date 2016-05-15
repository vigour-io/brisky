'use strict'

module.exports = exports = function getMdPlaceholders (str) {
  // It's important to create a new RegExp every time this function is called
  // This way the `lastIndex` property is reset with each call,
  // but useful within the call to fetch subsequent matches
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches
  var re = new RegExp(exports.placeholderRE, 'g')
  var out = []
  var matches = re.exec(str)
  if (matches === null) {
    return false
  }
  while (matches) {
    out.push({
      plugin: matches[1],
      matches: matches
    })
    matches = re.exec(str)
  }
  return out
}

// There is a good reason why this is a string and not a RegExp
// see the comment above `new RegExp`
exports.placeholderRE = '<!--\\s*VDOC\\.(\\S+)([\\s\\S]+?)(?=-->)-->'
