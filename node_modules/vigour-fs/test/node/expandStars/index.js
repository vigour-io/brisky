var path = require('path')
var fs = require('../../../')
var root = path.join(__dirname, '..', '..', 'data')

describe('fs.expandStars', function () {
  var expected = {
    a: {
      'c.txt': true,
      'd.txt': true,
      'sub': {
        'sub.txt': true
      }
    },
    'b.txt': true,
    e: {
      h: { 'i.txt': true }
    }
  }
  it('should return the expected object', function () {
    var obj = {
      a: '*',
      'b.txt': true,
      e: { h: '*' }
    }
    return fs.expandStars(obj, root)
      .then(function (observed) {
        expect(observed).to.deep.equal(expected)
      })
  })
  it('should also work with `true` instead of `*`', function () {
    var obj = {
      a: true,
      'b.txt': true,
      e: { h: true }
    }
    return fs.expandStars(obj, root)
      .then(function (observed) {
        expect(observed).to.deep.equal(expected)
      })
  })
  it('should also work with `false`', function () {
    var obj = {
      a: true,
      'b.txt': true,
      e: false
    }
    var myExpected = {
      a: {
        'c.txt': true,
        'd.txt': true,
        'sub': {
          'sub.txt': true
        }
      },
      'b.txt': true
    }
    return fs.expandStars(obj, root)
      .then(function (observed) {
        console.log('ob', observed)
        expect(observed).to.deep.equal(myExpected)
      })
  })
})
