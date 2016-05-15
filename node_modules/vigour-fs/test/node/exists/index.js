/* global describe, it, expect */

var fs = require('../../../')
describe('fs.exists', function () {
  it('should `cb(true)` if file exists',
  function (done) {
    fs.exists(__filename, function (exists) {
      expect(exists).to.equal(true)
      done()
    })
  })

  it('should `cb(true)` if directory exists',
  function (done) {
    fs.exists(__dirname, function (exists) {
      expect(exists).to.equal(true)
      done()
    })
  })

  it('should `cb(false)` if file doesn\'t exist',
  function (done) {
    fs.exists('inexistent', function (exists) {
      expect(exists).to.equal(false)
      done()
    })
  })

  it('should `cb(null, true)` if file exists and `cb` accepts 2 arguments',
  function (done) {
    fs.exists(__filename, function (err, exists) {
      expect(err).to.equal(null)
      expect(exists).to.equal(true)
      done()
    })
  })

  it('should `cb(null, true)` if directory exists and `cb` accepts 2 arguments',
  function (done) {
    fs.exists(__dirname, function (err, exists) {
      expect(err).to.equal(null)
      expect(exists).to.equal(true)
      done()
    })
  })

  it('should `cb(null, false)` if file doesn\'t exist',
  function (done) {
    fs.exists('inexistent', function (err, exists) {
      expect(err).to.equal(null)
      expect(exists).to.equal(false)
      done()
    })
  })
})
