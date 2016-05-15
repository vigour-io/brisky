/* global describe, it, expect */

var path = require('path')
var fs = require('../../../lib/server')
var getUrl = require('../../helpers/geturl')
var Promise = require('promise')
var readFile = Promise.denodeify(fs.readFile)
var exec = require('child_process').exec

describe('fs.readFile', function () {
  it("should fail with `err.code === 'EISDIR'` on directories", function (done) {
    fs.readFile('/', { encoding: 'utf8' }, function (err, data) {
      expect(err.code).to.equal('EISDIR')
      done()
    })
  })

  it("should fail with `err.code === 'ENOENT'` on inexistant files", function (done) {
    var filename = path.join(__dirname, 'does_not_exist.txt')
    fs.readFile(filename, 'raw', function (err, data) {
      expect(err.code).to.equal('ENOENT')
      expect(err.message.indexOf(filename) >= 0)
      expect(data).not.to.exist
      done()
    })
  })

  it('should work on empty files', function (done) {
    var filename = path.join(__dirname, '..', '..', 'data', 'empty.txt')
    fs.readFile(filename, function (err, data) {
      expect(err).not.to.exist
      expect(data).to.exist
      done()
    })
  })

  it('should work on empty files using utf8', function (done) {
    var filename = path.join(__dirname, '..', '..', 'data', 'empty.txt')
    fs.readFile(filename, 'utf8', function (err, data) {
      expect(err).not.to.exist
      expect(data).to.equal('')
      done()
    })
  })

  it('should work on streams', function (done) {
    var filename = path.join(__dirname, '..', '..', 'data', 'one.txt')
    var dataExpected = fs.readFileSync(filename, 'utf8')
    var node = JSON.stringify(process.execPath)
    var script = path.join(__dirname, '..', '..', 'scripts', 'readFromStream.js')
    var cmd = 'cat ' + filename + ' | ' + node + ' ' + script
    exec(cmd, function (err, stdout, stderr) {
      expect(err).not.to.exist
      expect(stdout).to.equal(dataExpected)
      expect(stderr).to.equal('')
      done()
    })
  })
  it('should accept URLs', function () {
    var url = 'http://perdu.com'
    return Promise.all([
      readFile(url, 'utf8'),
      getUrl(url)
    ]).then(function (vals) {
      expect(vals[0]).to.equal(vals[1])
    })
  })
})
