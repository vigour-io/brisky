'use strict'

var test = require('tape')
var convertFunction = require('../../lib/tags/function')
var jsdoc2md = require('../../')

test('convertFunction', function (t) {
  var testCases = [
    // 0
    [
      [' * @function boom',
        ' * @param power',
        ' * @param {string} force',
        ' * @arg energy Something',
        ' * @param strength - something',
        ' * @argument {string} radiation - something again',
        ' * @param richter {number} - makes less and less sence'],
      '#### boom(power, force, energy, strength, radiation, richter)'
    ],
    // 1
    [
      [' * @function boom',
        ' * @returns {string} desc - description of explosion'],
      '#### var desc = boom()'
    ],
    // 2
    [
      [' * @function boom',
        ' * @param radius',
        ' * @returns desc - description of explosion'],
      '#### var desc = boom(radius)'
    ],
    // 3
    [
      [' * @function boom',
        ' * @returns {string} desc -'],
      '#### var desc = boom()'
    ],
    // 4
    [
      [' * @function boom',
        ' * @returns desc'],
      '#### var desc = boom()'
    ],
    // 5
    [
      [' * @function boom',
        ' * @returns {string}'],
      '#### var *string* = boom()'
    ],
    // 6
    [
      [' * @function boom',
        ' * @param [radius]'],
      '#### boom([radius])'
    ],
    // 7
    [
      [' * @function boom',
        ' * @param rahh',
        ' * @param [radius]'],
      '#### boom(rahh, [radius])'
    ],
    // 8
    [
      [' * @function boom',
        ' * @param rahh',
        ' * @param [radius]',
        ' * @param [opt]'],
      '#### boom(rahh, [radius], [opt])'
    ],
    // 9
    [
      [' * @function boom',
        ' * @param [optional]',
        ' * @param required'],
      '#### boom([optional], required)'
    ],
    // 10
    [
      [' * @function boom',
        ' * @param required',
        ' * @param [optional]',
        ' * @param required2'],
      '#### boom(required, [optional], required2)'
    ]
  ]
  var len = testCases.length
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    var parts = testCases[i][0][0].match(jsdoc2md.lineRE)
    var tagName = parts[1]
    var name = parts[2]
    var type = parts[3]
    var rest = parts[4]
    t.equals(convertFunction(testCases[i][0][0], 0, testCases[i][0], tagName, name, type, rest),
      testCases[i][1],
      'test case i=' + i)
  }
})
