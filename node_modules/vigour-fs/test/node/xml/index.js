/* globals describe, it, beforeEach, before, after, afterEach, expect  */

var path = require('path')
var express = require('express')
var Promise = require('promise')
var fs = require('../../../lib/server')
var mkdirp = Promise.denodeify(fs.mkdirp)
var remove = Promise.denodeify(fs.remove)
var readFile = Promise.denodeify(fs.readFile)
var writeFile = Promise.denodeify(fs.writeFile)
var writeXML = Promise.denodeify(fs.writeXML)
var readXML = Promise.denodeify(fs.readXML)
var editXML = Promise.denodeify(fs.editXML)
var unlink = Promise.denodeify(fs.unlink)
var tmpPath = path.join(__dirname, 'tmp')
var fileName = 'file.XML'
var filePath = path.join(tmpPath, fileName)

var simpleFile = path.join(__dirname, '..', '..', 'data', 'simple.xml')
var smallFile = path.join(__dirname, '..', '..', 'data', 'small.xml')
var bigFile = path.join(__dirname, '..', '..', 'data', 'big.xml')

describe('xml', function () {
  describe('fs.readXML', function () {
    describe('file', function () {
      it('should return simple XML as json', function (done) {
        fs.readXML(simpleFile, function (err, obj) {
          expect(err).not.to.exist
          expect(obj.tag).to.equal('content')
          done()
        })
      })
      it('should parse tags and values of complex XML', function (done) {
        fs.readXML(bigFile, function (err, obj) {
          expect(err).not.to.exist
          expect(obj.somelist).to.exist
          expect(obj.somelist.item).to.have.length(2)
          expect(obj.somelist.item[0]._).to.equal('one')
          expect(obj.somelist.item[1]._).to.equal('two')

          expect(obj.somelist.thing).to.have.length(3)
          expect(obj.somelist.thing[0].part).to.have.length(3)
          expect(obj.somelist.thing[1]._).to.equal('some text, just a string')
          expect(obj.somelist.thing[2]._).to.equal('42')
          done()
        })
      })
      it('should parse xml attributes', function (done) {
        fs.readXML(bigFile, function (err, obj) {
          expect(err).not.to.exist

          expect(obj.somelist.$).to.not.exist

          expect(obj.somelist.item[0].$).to.have.all.keys({'id': 1})
          expect(obj.somelist.item[1].$).to.have.all.keys({'id': '2'})

          expect(obj.somelist.thing[0].$).to.have.all.keys({'name': 'foo'})
          expect(obj.somelist.thing[1].$).to.have.all.keys({'name': 'bar'})
          expect(obj.somelist.thing[2].$).to.have.all.keys({'name': 'baz', 'id': 'qux'})

          done()
        })
      })
    })

    describe('http(s)', function () {
      var server = express()
      var port = 8000
      var handle
      server.use(function (req, res, next) {
        res.status(200).end('<a>Hello World</a>')
      })
      before(function (done) {
        handle = server.listen(port, done)
      })

      it('should return parsed XML', function (done) {
        var url = 'http://localhost:' + port
        fs.readXML(url, function (err, obj) {
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

  describe('fs.writeXML', function () {
    afterEach(function () {
      return remove(tmpPath)
    })
    it('should write XML with tags, attributes and values', function () {
      var obj = {
        tag: {
          $: {'attr': 'value'},
          _: 'content'
        }
      }
      return writeXML(filePath, obj, { mkdirp: true })
        .then(function () {
          return readFile(filePath, 'utf8')
        })
        .then(function (contents) {
          expect(contents).to.equal('<tag attr="value">content</tag>')
        })
    })
  })

  describe('fs.editXML', function () {
    function editTest (changeFn, testFn) {
      return function () {
        return editXML(filePath, changeFn)
          .then(function () {
            return readXML(filePath)
          })
          .then(testFn)
      }
    }

    before(function () {
      return mkdirp(tmpPath)
    })
    beforeEach(function () {
      return readFile(smallFile)
        .then(function (file) {
          return writeFile(filePath, file)
        })
    })

    it('should edit values in the XML file', editTest(
      function (xml) {
        xml.list.item[0]._ = 'two'
        return xml
      },
      function (xml) {
        expect(xml.list.item[0]._).to.equal('two')
      })
    )

    it('should change tags in xml', editTest(
      function (xml) {
        xml.list.thing = xml.list.item
        delete xml.list.item
        return xml
      },
      function (xml) {
        expect(xml.list.item).to.not.exist
        expect(xml.list.thing[0]._).to.equal('one')
      })
    )

    it('should add tags in xml', editTest(
      function (xml) {
        xml.list.stuff = 'cool'
        return xml
      },
      function (xml) {
        expect(xml.list.item[0]._).to.equal('one')
        expect(xml.list.stuff[0]).to.equal('cool')
      })
    )

    it('should remove tags in xml', editTest(
      function (xml) {
        delete xml.list.thing
        return xml
      },
      function (xml) {
        expect(xml.list[0]).to.be.empty
      })
    )

    it('should change attributes of tags', editTest(
      function (xml) {
        xml.list.item[0].$.id = '2'
        return xml
      },
      function (xml) {
        expect(xml.list.item[0].$.id).to.equal('2')
      })
    )

    it('should add attributes of tags', editTest(
      function (xml) {
        xml.list.item[0].$.attr = '5'
        return xml
      },
      function (xml) {
        expect(xml.list.item[0].$.id).to.equal('1')
        expect(xml.list.item[0].$.attr).to.equal('5')
      })
    )

    it('should remove attributes of tags', editTest(
      function (xml) {
        delete xml.list.item[0].$.id
        return xml
      },
      function (xml) {
        expect(xml.list.item[0].$).to.be.empty
      })
    )

    afterEach(function () {
      return unlink(filePath)
    })
    after(function () {
      return remove(tmpPath)
    })

  })
})
