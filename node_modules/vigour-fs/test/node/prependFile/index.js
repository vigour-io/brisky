/* global describe, it, expect, beforeEach, afterEach */

var path = require('path')
var Promise = require('promise')
var fs = require('../../../lib/server')
var writeFile = Promise.denodeify(fs.writeFile)
var unlink = Promise.denodeify(fs.unlink)
var prependFile = Promise.denodeify(fs.prependFile)
var readFile = Promise.denodeify(fs.readFile)

describe('fs.prependFile', function () {
  var filename = path.join(__dirname, 'tmp.txt')
  beforeEach(function () {
    return writeFile(filename, 'B')
  })
  it('should prepend to the file', function () {
    return prependFile(filename, 'A')
      .then(function () {
        return readFile(filename, 'utf8')
      })
      .then(function (data) {
        expect(data).to.equal('AB')
      })
  })
  afterEach(function () {
    return unlink(filename)
  })
})
