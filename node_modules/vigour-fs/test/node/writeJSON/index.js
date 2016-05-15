/* global describe, afterEach, it, expect, before, after */

var path = require('path')
var express = require('express')
var Promise = require('promise')
var fs = require('../../../lib/server')
var remove = Promise.denodeify(fs.remove)
var readFile = Promise.denodeify(fs.readFile)
var readJSON = Promise.denodeify(fs.readJSON)
var writeJSON = Promise.denodeify(fs.writeJSON)
var tmpPath = path.join(__dirname, 'tmp')
var fileName = 'file.json'
var filePath = path.join(tmpPath, fileName)

describe('fs.writeJSON', function () {
  describe('file', function () {
    afterEach(function () {
      return remove(tmpPath)
    })
    it('should write stringified JSON', function () {
      var obj = {
        key: 'value'
      }
      return writeJSON(filePath, obj, { mkdirp: true })
        .then(function () {
          return readFile(filePath, 'utf8')
        })
        .then(function (contents) {
          expect(contents).to.equal('{"key":"value"}')
        })
    })
  })

  describe('http(s)', function () {
    var server = express()
    var port = 8000
    var handle
    server.use(function (req, res, next) {
      res.status(200).end(JSON.stringify({a: 'Hello World'}))
    })
    before(function (done) {
      handle = server.listen(port, done)
    })

    it('should work with URLs', function () {
      var url = 'http://localhost:' + port
      var filePath = path.join(tmpPath, fileName)
      return writeJSON(filePath, url, { mkdirp: true })
        .then(function () {
          return readJSON(filePath)
        })
        .then(function (obj) {
          expect(obj.a).to.equal('Hello World')
        })
    })

    after(function () {
      return remove(tmpPath)
    })
    after(function (done) {
      handle.close(done)
    })
  })
})
