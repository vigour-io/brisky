var fs = require('../..')
var path = require('path')
var existingFile = path.join(__filename)
var nonExistingFile = path.join(__dirname, 'non-existing-file.js')
var packagePath = path.join(__dirname, '..', '..', 'package.json')

describe('vigour-fs-promised', function () {
  it('exists should `cb(true)`'
  , function (done) {
    fs.exists(existingFile, function (exists) {
      expect(exists).to.be.true
      done()
    })
  })

  it('exists should `cb(null, true)`'
  , function (done) {
    fs.exists(existingFile, function (err, exists) {
      expect(err).to.be.null
      expect(exists).to.be.true
      done()
    })
  })

  it('existsAsync should return a promise for `true`'
  , function () {
    return fs.existsAsync(existingFile)
      .then(function (exists) {
        expect(exists).to.be.true
      })
  })

  it('existsAsync should return a promise for `false`'
  , function () {
    return fs.existsAsync(nonExistingFile)
      .then(function (exists) {
        expect(exists).to.be.false
      })
  })

  it('readFileAsync should return a promise for the contents of the file'
  , function () {
    return fs.readFileAsync(existingFile, 'utf8')
      .then(function (data) {
        expect(data).to.exist
      })
  })

  it('readFileAsync should return a promise and reject it'
  , function () {
    return fs.readFileAsync(nonExistingFile, 'utf8')
      .catch(function (err) {
        expect(err).to.exist
      })
  })

  it('readJSON should `cb(null, JSON.parse(package.json))`'
  , function () {
    return fs.readJSON(packagePath, function (err, obj) {
      expect(err).to.be.null
      expect(obj).to.exist
      expect(obj.name).to.equal('vigour-fs-promised')
    })
  })

  it('readJSONAsync should return a promise for the parsed package'
  , function () {
    return fs.readJSONAsync(packagePath)
      .then(function (jsonData) {
        expect(jsonData).to.exist
        expect(jsonData.name).to.equal('vigour-fs-promised')
      })
  })
})
