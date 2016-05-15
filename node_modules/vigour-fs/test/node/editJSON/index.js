/* global describe, it, expect, before, beforeEach, after, afterEach, sinon */

var path = require('path')
var express = require('express')
var Promise = require('promise')
var fs = require('../../../lib/server')
var mkdirp = Promise.denodeify(fs.mkdirp)
var remove = Promise.denodeify(fs.remove)
var unlink = Promise.denodeify(fs.unlink)
var writeJSON = Promise.denodeify(fs.writeJSON)
var readJSON = Promise.denodeify(fs.readJSON)
var editJSON = Promise.denodeify(fs.editJSON)
var tmpPath = path.join(__dirname, 'tmp')
var fileName = 'file.json'
var filePath = path.join(tmpPath, fileName)
describe('fs.editJSON', function () {
  before(function () {
    return mkdirp(tmpPath)
  })
  beforeEach(function () {
    return writeJSON(filePath, { a: true, b: 'hello' })
  })

  describe('file', function () {
    it('should edit the JSON file', function () {
      return editJSON(filePath, function (obj) {
          obj.a = false
          obj.b = 'world'
          return obj
        })
        .then(function () {
          return readJSON(filePath)
        })
        .then(function (obj) {
          expect(obj.a).to.equal(false)
          expect(obj.b).to.equal('world')
        })
    })

    it('should work with promises', function () {
      return editJSON(filePath, function (obj) {
          return new Promise(function (resolve, reject) {
            setTimeout(function () {
              obj.a = false
              obj.b = 'world'
              resolve(obj)
            }, 250)
          })
        })
        .then(function () {
          return readJSON(filePath)
        })
        .then(function (obj) {
          expect(obj.a).to.equal(false)
          expect(obj.b).to.equal('world')
        })
    })
  })

  describe('http(s)', function () {
    var server = express()
    var port = 8000
    var handle
    server.use(express.static(tmpPath))
    before(function (done) {
      handle = server.listen(port, done)
    })

    it("should fail with `err.code === 'TypeError'` if path is a url", function () {
      var url = 'http://localhost:' + port + '/' + fileName
      var spy = sinon.spy()
      expect(spy)
      return editJSON(url, spy)
        .catch(function (reason) {
          expect(reason.code).to.equal('TypeError')
        })
        .done(function () {
          expect(spy).to.not.be.called
        })
    })

    after(function (done) {
      handle.close(done)
    })
  })

  afterEach(function () {
    return unlink(filePath)
  })
  after(function () {
    return remove(tmpPath)
  })
})
