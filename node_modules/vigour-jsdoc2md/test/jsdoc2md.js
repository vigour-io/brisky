'use strict'

var test = require('tape')

var jsdoc2md = require('../')

test('jsdoc2md', function (t) {
  var testCases = [
    // 0
    [
      `/**
 * @id jsdoc2mdtest
 * @function jsdoc2mdtest
 * Converts jsdoc comment blocks to markdown
 * @param {string} jsdoc - the jsdoc comment block to convert
 * @returns {string} result - the resulting markdown
 */`,
      `#### var result = jsdoc2mdtest(jsdoc)

Converts jsdoc comment blocks to markdown
- **jsdoc** (*string*) - the jsdoc comment block to convert
- **returns** (*string*) result - the resulting markdown`
    ],
    // 1
    [
      `/**
\t*\tCreates an instance of Circle.
\t*\t
\t*\t@constructor
\t*\t@this {Circle}
\t*\t@param {number} r The desired radius of the circle.
\t*/`,
      `Creates an instance of Circle.
- **constructor**
- **this** {*Circle*}
- **r** (*number*) - The desired radius of the circle.`
    ],
    // 2
    [
      `/**
 * @id theID
 * @function theFunctionName
 * ***Oh*** man this *function* does **so** many [things](http://things.com)!!!
 * @param {string} text - Words, \`sentences\`, and more*
 * @param {number} amount
 * @param {boolean} isCool - always \`true\`
 * @param {array} things All sorts of things
 * @returns {boolean} crazy
 */`,
      `#### var crazy = theFunctionName(text, amount, isCool, things)

***Oh*** man this *function* does **so** many [things](http://things.com)!!!
- **text** (*string*) - Words, \`sentences\`, and more*
- **amount** (*number*)
- **isCool** (*boolean*) - always \`true\`
- **things** (*array*) - All sorts of things`
    ],
    // 3
    [
      `/**
 * @id bla
 * @function boom
 * Explodes
 * @returns {string}`,
      `#### var *string* = boom()

Explodes`
    ],
    // 4
    [
      `/**
 * @id bla
 * @function boom
 * Explodes
 * @returns {string} description -`,
      `#### var description = boom()

Explodes
- **returns** (*string*) description`
    ],
    // 5
    [
      `/**
 * @id bla
 * @function boom
 * Explodes
 * @returns {string} - a description of the mushroom cloud`,
      `#### var *string* = boom()

Explodes
- **returns** (*string*) - a description of the mushroom cloud`
    ]
  ]
  var len = testCases.length
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    t.equals(jsdoc2md(testCases[i][0]),
      testCases[i][1],
      'test case i=' + i
    )
  }
})
