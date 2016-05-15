// var path = require('path')
// var fs = require('../../../lib/server')
//
// describe('cpr', function () {
//   var srcDirPath = path.join(__dirname, 'dir')
//   var srcOnePath = path.join(srcDirPath, 'one.txt')
//   var srcTwoPath = path.join(srcDirPath, 'two.txt')
//   var srcOneContent = 'Super witty remark'
//   var srcTwoContent = 'Incredibly different'
//   var dstDirPath = path.join(__dirname, 'dst')
//   var dstOnePath = path.join(dstDirPath, 'one.txt')
//   var dstTwoPath = path.join(dstDirPath, 'two.txt')
//   before(function (done) {
//     fs.writeFile(srcOnePath, srcOneContent, { encoding: 'utf8', mkdirp: true }, function (err) {
//       if (err) {
//         console.error('Error writing source file 1', err)
//       } else {
//         fs.writeFile(srcTwoPath, srcTwoContent, { encoding: 'utf8', mkdirp: true }, function (err) {
//           if (err) {
//             console.error('Error writing source file 2', err)
//           } else {
//             done()
//           }
//         })
//       }
//     })
//   })
//   after(function (done) {
//     fs.remove(srcDirPath, function (err) {
//       if (err) {
//         console.error('Error removing source directory', err)
//       } else {
//         done()
//       }
//     })
//   })
//
//   it('should copy directory', function (done) {
//     fs.cpr(srcDirPath, dstDirPath, function (err) {
//       expect(err).not.to.exist
//       var one
//       var two
//       fs.readFile(dstOnePath, 'utf8', function (err, content) {
//         expect(err).not.to.exist
//         expect(content).to.equal(srcOneContent)
//         one = true
//         finish()
//       })
//       fs.readFile(dstTwoPath, 'utf8', function (err, content) {
//         expect(err).not.to.exist
//         expect(content).to.equal(srcTwoContent)
//         two = true
//         finish()
//       })
//       function finish () {
//         if (one && two) {
//           done()
//         }
//       }
//     })
//     after(function (done) {
//       fs.remove(dstDirPath, function (err) {
//         if (err) {
//           console.error('Error removing destination directory', err)
//         } else {
//           done()
//         }
//       })
//     })
//   })
//
//   it('should create missing directories', function (done) {
//     var dstDirBase = path.join(__dirname, 'newDir')
//     var dstDirPath = path.join(dstDirBase, 'dst')
//     var dstOnePath = path.join(dstDirPath, 'one.txt')
//     var dstTwoPath = path.join(dstDirPath, 'two.txt')
//     fs.cpr(srcDirPath, dstDirPath, function (err) {
//       expect(err).not.to.exist
//       var one
//       var two
//       fs.readFile(dstOnePath, 'utf8', function (err, content) {
//         expect(err).not.to.exist
//         expect(content).to.equal(srcOneContent)
//         one = true
//         finish()
//       })
//       fs.readFile(dstTwoPath, 'utf8', function (err, content) {
//         expect(err).not.to.exist
//         expect(content).to.equal(srcTwoContent)
//         two = true
//         finish()
//       })
//       function finish () {
//         if (one && two) {
//           done()
//         }
//       }
//     })
//     after(function (done) {
//       fs.remove(dstDirBase, function (err) {
//         if (err) {
//           console.error('Error removing destination directory', err)
//         } else {
//           done()
//         }
//       })
//     })
//   })
// })
