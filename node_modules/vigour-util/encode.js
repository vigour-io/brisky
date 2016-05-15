'use strict'

/**
 * @function base62
 * encode to base 62 usefull for urls
 * @memberOf util#
 * @param  {string} val - convert string to base62
 */
exports.base62 = function base62 (val) {
  var b
  b = b || ''
  return ~~ val //eslint-disable-line
    ? base62(val / 62, String.fromCharCode(((val %= 62) > 9
          ? val > 35 ? 29 : 87
          : 48) + val) + b)
    : b
}

exports.base62.decode = function (val, b, c, d) {
  for (b = c = 0; d = val.charCodeAt(c++); b = b * 62 + d - [ , 48, 29, 87][d >> 5]) //eslint-disable-line
    return b
}

// TODO: exports.decode64 (when nessecary)
