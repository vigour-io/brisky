var path = require('path')
var fs = require('../../../lib/server')

describe('cp', function () {
  var srcPath = path.join(__dirname, 'src.txt')
  var srcContent = 'Super witty remark'
  var dstPath = path.join(__dirname, 'dst.txt')
  before(function (done) {
    fs.writeFile(srcPath, srcContent, 'utf8', function (err) {
      if (err) {
        console.error('Error writing source file', err)
      } else {
        done()
      }
    })
  })
  after(function (done) {
    fs.unlink(srcPath, function (err) {
      if (err) {
        console.error('Error removing source file', err)
      } else {
        done()
      }
    })
  })

  it('should copy files', function (done) {
    fs.cp(srcPath, dstPath, function (err) {
      expect(err).not.to.exist
      fs.readFile(dstPath, 'utf8', function (err, content) {
        expect(err).not.to.exist
        expect(content).to.equal(srcContent)
        done()
      })
    })
    after(function (done) {
      fs.unlink(dstPath, function (err) {
        if (err) {
          console.error('Error removing destination file', err)
        } else {
          done()
        }
      })
    })
  })

  it('should fail with `ENOENT` when writing to inexisting directory', function (done) {
    var dstDir = path.join(__dirname, 'newDir')
    var dstPath = path.join(dstDir, 'dst.txt')
    fs.cp(srcPath, dstPath, function (err) {
      expect(err).to.exist
      expect(err.code).to.equal('ENOENT')
      done()
    })
  })

  it('should optionally create missing directories', function (done) {
    var dstDir = path.join(__dirname, 'newDir')
    var dstPath = path.join(dstDir, 'dst.txt')
    fs.cp(srcPath, dstPath, { mkdirp: true }, function (err) {
      expect(err).not.to.exist
      fs.readFile(dstPath, 'utf8', function (err, content) {
        expect(err).not.to.exist
        expect(content).to.equal(srcContent)
        done()
      })
    })
    after(function (done) {
      fs.remove(dstDir, function (err) {
        if (err) {
          console.error('Error removing destination file', err)
        } else {
          done()
        }
      })
    })
  })
})
