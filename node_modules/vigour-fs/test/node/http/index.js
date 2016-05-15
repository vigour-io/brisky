'use strict'

var path = require('path')
var express = require('express')
var fs = require('../../../lib/server')
var Promise = require('promise')
var readFile = Promise.denodeify(fs.readFile)
var writeFile = Promise.denodeify(fs.writeFile)
var remove = Promise.denodeify(fs.remove)
var port = 8100
var headerName = 'Authorization'
var headerValue = 'Basic someencryptedstring='
var headers = {}
headers[headerName] = headerValue
var server
var tmpFilePath = path.join(__dirname, 'tmpFile.txt')
var url = 'http://localhost:' + port + '/'
describe('http', function () {
  before(function (done) {
    var app = express()
    app.get('/', function (req, res, next) {
      expect(req.headers[headerName.toLowerCase()]).to.equal(headerValue)
      res.status(200).end('YEAH!')
    })
    server = app.listen(port, '127.0.0.1', function () {
      done()
    })
  })
  describe('readFile (http)', function () {
    it('should include any provided headers', function () {
      return readFile(url, { headers: headers })
    })
  })

  describe('writeFile (http)', function () {
    it('should include any provided headers', function () {
      return writeFile(tmpFilePath, url, { headers: headers })
    })
  })
  after(function (done) {
    server.close(done)
  })
  after(function () {
    return remove(tmpFilePath)
  })
})
