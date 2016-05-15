var path = require('path')
var express = require('express')
var fs = require('../../../lib/server')

describe('fs.readJSON', function () {
  describe('file', function () {
    it('should return parsed JSON', function (done) {
      var filename = path.join(__dirname, '..', '..', 'data', 'valid.json')
      fs.readJSON(filename, function (err, obj) {
        expect(err).not.to.exist
        expect(obj.key).to.equal('value')
        done()
      })
    })
  })

  describe('http(s)', function () {
    var server = express()
    var port = 8000
    var handle
    server.use(function (req, res, next) {
      res.status(200).end('{"a":"Hello World"}')
    })
    before(function (done) {
      handle = server.listen(port, done)
    })

    it('should return parsed JSON', function (done) {
      var url = 'http://localhost:' + port
      fs.readJSON(url, function (err, obj) {
        expect(err).not.to.exist
        expect(obj.a).to.equal('Hello World')
        done()
      })
    })

    after(function (done) {
      handle.close(done)
    })
  })
})
