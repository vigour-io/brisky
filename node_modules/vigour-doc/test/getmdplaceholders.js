'use strict'

var test = require('tape')
var _filter = require('lodash.filter')
var getMdPlaceholders = require('../lib/getmdplaceholders')

test('getMdPlaceholders', function (t) {
  var randomChars = 'liu#asd gL*IU_SH{[DG\nJ098q7\t345)(*&@%ˆ¨©º•§'
  var expected = [
    {
      plugin: 'plugin',
      matches: [
        '',
        'plugin'
      ]
    }
  ]

  var plugin1 = 'pluginOne'
  var plugin2 = 'pluginTwo'
  var expectedMultiple = [
    {
      plugin: plugin1,
      matches: [
        '',
        plugin1
      ]
    },
    {
      plugin: plugin2,
      matches: [
        '',
        plugin2
      ]
    }
  ]

  var testCases = [
    [randomChars, false],
    [randomChars + '<!-- VDO' + randomChars + ' -->' + randomChars, false],
    [randomChars + '<!-- VDOC.plugin ' + randomChars + ' -->' + randomChars, expected],
    [randomChars + '<!--VDOC.plugin ' + randomChars + '-->' + randomChars, expected],
    [randomChars + '<!--\tVDOC.plugin ' + randomChars + '\t-->' + randomChars, expected],
    [randomChars + '<!--\nVDOC.plugin ' + randomChars + '\n-->' + randomChars, expected]
  ]
  var nbFalse = _filter(testCases, (item) => {
    return item[1] === false
  }).length
  var len = testCases.length
  var testCases_multiple = [
    [randomChars + '<!--\nVDOC.pluginOne ' + randomChars + '\n-->' + randomChars +
      '<!--\nVDOC.pluginTwo ' + randomChars + '\n-->', expectedMultiple]
  ]
  var len_m = testCases_multiple.length
  console.log('plan', 2 * (len - 1) + 2 * (expectedMultiple.length))
  var nbTests = nbFalse +
    (2 * (len - nbFalse)) +
    (2 * len_m * expectedMultiple.length)
  t.plan(nbTests)
  runTests(t, len, testCases)
  runTests(t, len_m, testCases_multiple)
})

function runTests (t, len, testCases) {
  var res
  var nb
  for (let i = 0; i < len; i += 1) {
    res = getMdPlaceholders(testCases[i][0])
    if (!res) {
      t.equal(res, testCases[i][1], 'getMdPlaceholders(\'' + testCases[i][0] + '\') === ' + testCases[i][1])
    } else {
      nb = testCases[i][1].length
      for (let j = 0; j < nb; j += 1) {
        t.equals(res[j].plugin,
          testCases[i][1][j].plugin,
          'getMdPlaceholders(\'' + testCases[i][0] + '\')[' + j + '].plugin === ' + testCases[i][1][j].plugin)
        t.equals(res[j].matches[1],
          testCases[i][1][j].matches[1],
          'getMdPlaceholders(\'' + testCases[i][0] + '\')[' + j + '].matches[1] === ' + testCases[i][1][j].matches[1])
      }
    }
  }
}
