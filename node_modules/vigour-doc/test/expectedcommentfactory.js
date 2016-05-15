'use strict'
module.exports = exports = function expectedCommentFactory (fnName, id) {
  return `#### var canMakeYouHappy = ${fnName}(text, amount, isCool, things)

***Oh*** man this *function* does **so** many [things](http://things.com)!!!
- **text** (*string*) - Words, \`sentences\`, and more*
- **amount** (*number*)
- **isCool** (*boolean*) - always \`true\`
- **things** (*array*) - All sorts of things
- **returns** (*boolean*) canMakeYouHappy - usually \`true\``
}
