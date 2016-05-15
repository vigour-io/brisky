'use strict'

module.exports = exports = function commentFactory (fnName, id) {
  return `/**
 * @id ${id}
 * @function ${fnName}
 * ***Oh*** man this *function* does **so** many [things](http://things.com)!!!
 * @param {string} text - Words, \`sentences\`, and more*
 * @param {number} amount
 * @param {boolean} isCool - always \`true\`
 * @param {array} things All sorts of things
 * @returns {boolean} canMakeYouHappy - usually \`true\`
 */`
}
