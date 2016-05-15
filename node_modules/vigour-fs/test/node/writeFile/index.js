'use strict'
/* global describe, it, expect, after, beforeEach, afterEach */

var path = require('path')
var Promise = require('promise')
var fs = require('../../../lib/server')
var writeFile = Promise.denodeify(fs.writeFile)
var readFile = Promise.denodeify(fs.readFile)
var unlink = Promise.denodeify(fs.unlink)
var remove = Promise.denodeify(fs.remove)
var getUrl = require('../../helpers/geturl')
var strContent = '南越国是前203年至前111年存在于岭南地区的一个国家，国都位于番禺，疆域包括今天中国的广东、' +
  '广西两省区的大部份地区，福建省、湖南、贵州、云南的一小部份地区和越南的北部。' +
   '南越国是秦朝灭亡后，由南海郡尉赵佗于前203年起兵兼并桂林郡和象郡后建立。' +
   '前196年和前179年，南越国曾先后两次名义上臣属于西汉，成为西汉的“外臣”。前112年，' +
   '南越国末代君主赵建德与西汉发生战争，被汉武帝于前111年所灭。南越国共存在93年，' +
   '历经五代君主。南越国是岭南地区的第一个有记载的政权国家，采用封建制和郡县制并存的制度，' +
   '它的建立保证了秦末乱世岭南地区社会秩序的稳定，有效的改善了岭南地区落后的政治、##济现状。' +
   '\n'
var bufContent = new Buffer(strContent, 'utf8')
var numContent = 42
var tmpFilename = path.join(__dirname, 'tmp.txt')

describe('fs.writeFile', function () {
  describe('normal usage', function () {
    afterEach(function () {
      return unlink(tmpFilename)
    })
    it('should accept strings', function () {
      return writeFile(tmpFilename, strContent)
        .then(function () {
          return readFile(tmpFilename, 'utf8')
        })
        .then(function (str) {
          expect(str).to.equal(strContent)
        })
    })

    it('should accept buffers', function () {
      return writeFile(tmpFilename, bufContent)
        .then(function () {
          return readFile(tmpFilename)
        })
        .then(function (buffer) {
          expect(buffer).to.deep.equal(bufContent)
        })
    })

    it('should accept numbers', function () {
      return writeFile(tmpFilename, numContent)
        .then(function () {
          return readFile(tmpFilename, 'utf8')
        })
        .then(function (nb) {
          expect(nb).to.equal(numContent.toString())
        })
    })
    it('should accept URLs', function () {
      var url = 'http://perdu.com'
      return Promise.all([
        writeFile(tmpFilename, url)
          .then(function () {
            return readFile(tmpFilename, 'utf8')
          }),
        getUrl(url)
      ]).then(function (vals) {
        expect(vals[0]).to.equal(vals[1])
      })
    })
  })

  describe('url option', function () {
    afterEach(function () {
      return unlink(tmpFilename)
    })
    it('should write the URL to the file if `options.url === false`', function () {
      var url = 'http://perdu.com'
      return writeFile(tmpFilename, url, { url: false })
        .then(function () {
          return readFile(tmpFilename, 'utf8')
        })
        .then(function (str) {
          expect(str).to.equal(url)
        })
    })
  })

  describe('mkdirp option', function () {
    var dirpath = path.join(__dirname, 'temporary')
    var filepath = path.join(dirpath, 'file.txt')

    beforeEach(function (done) {
      fs.exists(filepath, function (exists) {
        expect(exists).to.equal(false)
        done()
      })
    })

    it("should fail with `err.code === ENOENT` if target directory doesn't exist", function () {
      return writeFile(filepath, strContent, { mkdrip: true })
        .catch(function (reason) {
          expect(reason.code).to.equal('ENOENT')
        })
    })

    it('should create necessary directories when `options.mkdirp === true`', function () {
      after(function () {
        return remove(dirpath)
      })
      return writeFile(filepath, strContent, { mkdirp: true })
        .catch(function (reason) {
          console.error('OOPS', reason)
          throw reason
        })
        .then(function () {
          return readFile(filepath, 'utf8')
        })
        .then(function (str) {
          expect(str).to.equal(strContent)
        })
    })
  })

  describe('long file paths', function () {
    it('should handle 260-character-long file paths', function () {
      var filenameLen = Math.max(260 - __dirname.length - 1, 1)
      var filename = path.join(__dirname, new Array(filenameLen + 1).join('x'))

      after(function () {
        return unlink(filename)
      })

      return writeFile(filename, strContent)
    })

    it("should fail with `err.code === 'ENAMETOOLONG'` on 1000-character-long file paths", function () {
      var filenameLen = Math.max(1000 - __dirname.length - 1, 1)
      var filename = path.join(__dirname, new Array(filenameLen + 1).join('x'))

      return writeFile(filename, strContent)
        .catch(function (reason) {
          expect(reason.code).to.equal('ENAMETOOLONG')
        })
    })
  })
})
