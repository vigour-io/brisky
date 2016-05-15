'use strict'

var path = require('path')
var test = require('tape')
var _cloneDeep = require('lodash.clonedeep')
var fs = require('vigour-fs-promised')
var setup = require('./setup')
var commentFactory = require('./commentfactory')
var expectedCommentFactory = require('./expectedcommentfactory')
var Vdoc = require('../')

var tmpDir = path.join(__dirname, 'tmp')
var expectedTmpDir = path.join(__dirname, 'expected')
var idOne = 'whatever'
var idTwo = 'whatever-else'
var badges = '<!-- VDOC.badges travis; standard; npm -->'
var expectedBadges = badges + Vdoc.prototype.mdCommentStart + `
[![Build Status](https://travis-ci.org/vigour-io/doc.svg?branch=master)](https://travis-ci.org/vigour-io/doc)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-doc.svg)](https://badge.fury.io/js/vigour-doc)` + Vdoc.prototype.mdCommentEnd
var jsdocsOne = '<!-- VDOC.jsdoc ' + idOne + ' -->'
var expectedJsdocsOne = jsdocsOne + Vdoc.prototype.mdCommentStart + '\n' + expectedCommentFactory('one', idOne) + Vdoc.prototype.mdCommentEnd
var jsdocsTwo = '<!-- VDOC.jsdoc ' + idTwo + ' -->'
var expectedJsdocsTwo = jsdocsTwo + Vdoc.prototype.mdCommentStart + '\n' + expectedCommentFactory('two', idTwo) + Vdoc.prototype.mdCommentEnd
var options = {
  'README.md': {
    badges: badges,
    jsdocs: jsdocsOne
  },
  'another.md': {
    extraDir: 'sub',
    badges: badges,
    jsdocs: jsdocsTwo
  },
  'one.js': {
    extraDir: 'sub',
    comment: commentFactory('one', idOne)
  },
  'two.js': {
    extraDir: 'sub2',
    comment: commentFactory('two', idTwo)
  }
}
var expectedOptions = _cloneDeep(options)
expectedOptions['README.md'].badges = expectedBadges
expectedOptions['README.md'].jsdocs = expectedJsdocsOne
expectedOptions['another.md'].badges = expectedBadges
expectedOptions['another.md'].jsdocs = expectedJsdocsTwo

test('vdoc', function (t) {
  return setup(options, tmpDir)
    .then(() => {
      return setup(expectedOptions, expectedTmpDir)
    })
    .then(() => {
      var vdoc = new Vdoc({ wd: tmpDir })
      return vdoc.start()
        .then(() => {
          // Running vdoc twice (or any number of times)
          // should produce exactly the same result as running it once
          return vdoc.start()
        })
        .then(() => {
          return compareFiles(t, tmpDir, options, expectedTmpDir, expectedOptions)
        })
        .catch(catchErrors)
    })
    .then(() => {
      t.end()
    })
    .catch(catchErrors)
})

test('clean', function (t) {
  return setup(options, tmpDir)
    .then(() => {
      return setup(options, expectedTmpDir)
    })
    .then(() => {
      var vdoc = new Vdoc({ wd: tmpDir })
      return vdoc.start()
        .then(() => {
          vdoc.config.set({ clean: true })
          return vdoc.start()
        })
        .then(() => {
          return compareFiles(t, tmpDir, options, expectedTmpDir, options)
        })
    })
    .then(() => {
      t.end()
    })
    .catch(catchErrors)
})

test.onFinish(() => {
  return setup.teardown(tmpDir, expectedTmpDir)
})

function compareFiles (t, tmpDir, observed, expectedTmpDir, expected) {
  var proms = []
  for (let key in observed) {
    proms.push(filesMatch(t, key, tmpDir, observed[key], expectedTmpDir, expected[key]))
  }
  return Promise.all(proms)
}

function filesMatch (t, key, tmpDir, observed, expectedTmpDir, expected) {
  return Promise.all([
    fs.readFileAsync(path.join(tmpDir, observed.extraDir || '', key), 'utf8'),
    fs.readFileAsync(path.join(expectedTmpDir, expected.extraDir || '', key), 'utf8')
  ]).then((contents) => {
    t.equals(contents[0], contents[1], key + ' matches expectation')
  })
}

function catchErrors (reason) {
  var msg = reason.stack
    ? reason.stack
    : reason
  console.error(':(', msg)
}
