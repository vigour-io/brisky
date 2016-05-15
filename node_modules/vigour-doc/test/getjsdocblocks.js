'use strict'

var test = require('tape')
var getJsdocBlocks = require('../lib/getjsdocblocks')

var id1 = 'thisistheid'
var block1 = `/**
 * @id ${id1}
 */`
var expected1 = {}
expected1[id1] = block1

var randomChars = 'SDFGH@#$%^&*˚∆ß2345678ßå∑øˆ'
var block2 = `/**
 * @id ${randomChars}
 * @function whatever ${randomChars}
 * Yeah ${randomChars}
 * @params {Boom} ${randomChars} - booms
 */`
var expected2 = {}
expected2[randomChars] = block2

var idA = 'idA'
var idB = 'idB'
var block3a = `/**
 * @id ${idA}
 * @function heyhey
 */`

var block3b = `/**
 * @id ${idB}
 * @property hey
 */`

var block3 = block3a + `\n\n\n` + block3b

var expected3 = {}
expected3[idA] = block3a
expected3[idB] = block3b

var testCases = [
  [ block1, expected1 ],
  [ block2, expected2 ],
  [ block3, expected3 ]
]

var len = testCases.length

test('getJsdocBlocks', function (t) {
  t.plan(len)
  for (let i = 0; i < len; i += 1) {
    t.deepEqual(getJsdocBlocks(testCases[i][0]),
      testCases[i][1],
      'getJsdocBlocks(\'' + testCases[i][0] + '\') === ' + JSON.stringify(testCases[i][1]))
  }
})
