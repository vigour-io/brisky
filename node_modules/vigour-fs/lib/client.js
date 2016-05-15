/* global FileReader, FileTransfer, FileError */

var util = require('./util')
var nativeUtil = require('./nativeUtil')

module.exports = exports = {}

exports.readFile = function (path, options, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (!cb) {
      cb = options
      options = {}
    }
    if (err) {
      cb(err)
      return
    }
    util.defaults(options)
    ;(options.url !== false && util.url(path))
      ? util.readAjax(path, options, cb)
      : readFile(path, options, cb)
  })
}

function readFile (path, options, cb) {
  window.fs.root.getFile(path
    , {
      create: false
    }
    , function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader()
        reader.onloadend = function (err) {
          if (err.error) {
            cb(err)
          } else {
            cb(null, this.result)
          }
        }
        reader.readAsText(file)
      }, function (err) {
        err.failPoint = 'fileEntry.file'
        cb(err)
      })
    }, function (err) {
      err.failPoint = 'getFile'
      cb(err)
    })
}

exports.writeFile = function (path, data, options, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (!cb) {
      cb = options
      options = {}
    }
    if (err) {
      cb(err)
      return
    }
    util.defaults(options)
    ;(options.url !== false && util.url(data))
      ? writeHttp(path, data, options, cb)
      : writeFile(path, data, options, cb)
  })
}

function writeFile (path, data, options, cb) {
  window.fs.root.getFile(path
    , {
      create: true
    }
    , function (fileEntry) {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function (err) {
          if (err.error) {
            cb(err)
          } else {
            cb(null)
          }
        }
        fileWriter.onerror = function (err) {
          err.failPoint = 'onerror'
          cb(err)
        }
        fileWriter.write(data)
      }, function (err) {
        err.failPoint = 'createWriter'
        cb(err)
      })
    }, function (err) {
      err.failPoint = 'getFile'
      cb(err)
    })
}

function writeHttp (path, url, options, cb) {
  var fileTransfer = new FileTransfer()
  var uri = encodeURI(url)
  var error
  fileTransfer.download(
    uri
    , (window.fs.root.toURL() === 'undefined/') ? path : window.fs.root.toURL() + path // window.fs.root.toURL() === 'undefined/' on Windows Phone 8. Really? Really.
    , function (entry) {
      entry.file(function (file) {
        if (file.size !== 0) {
          cb(null, file)
        } else {
          error = new Error('Downloaded file empty')
          error.file = file
          cb(error)
        }
      }, function (err) {
        err.failPoint = 'fileEntry.file'
        cb(err)
      })
    }
    , function (err) {
      err.failPoint = 'fileTransfer.download'
      cb(err)
    }
    , false
  )
}

exports.exists = function (path, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (err) {
      cb(false, err)
      return
    }
    window.fs.root.getFile(path
      , { create: false }
      , function () {
        cb(true)
      }
      , function () {
        cb(false)
      })
  })
}

exports.mkdirp = function (path, cb) {
  nativeUtil.whenFsReady(function (err) {
    var folderParts = path.split('/')
    var createDir
    if (err) {
      cb(err)
      return
    }
    createDir = function (rootDir, folders) {
      // Throw out './' or '/' and move on. Prevents: '/foo/.//bar'.
      if (folders[0] === '.' || folders[0] === '') {
        folders = folders.slice(1)
      }
      rootDir.getDirectory(folders[0]
        , { create: true }
        , function (dirEntry) {
          if (dirEntry.isDirectory) {
            if (folders.length && folders.length > 1) {
              createDir(dirEntry, folders.slice(1))
            } else {
              cb(null)
            }
          } else {
            var error = new Error(path + ' is not a directory')
            cb(error)
          }
        }
        , function (err) {
          if (err.code === FileError.INVALID_MODIFICATION_ERR) {
            cb(null)
          } else {
            cb(err)
          }
        })
    }

    createDir(window.fs.root, folderParts)
  })
}

exports.remove = function (path, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (err) {
      cb(err)
      return
    }
    window.fs.root.getDirectory(
      path
      , { create: true, exclusive: false }
      , function (entry) {
        entry.removeRecursively(
          function (status) {
            if (status === 'OK') {
              cb(null)
            } else {
              cb(status)
            }
          }
          , function (event) {
            event.failPoint = 'entre.removeRecursively'
            cb(event)
          })
      }
      , function (event) {
        event.failPoint = 'fs.root.getDirectory'
        cb(event)
      })
  })
}

exports.rename = function (oldPath, newPath, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (err) {
      cb(err)
      return
    }
    window.fs.root.getFile(oldPath
      , {}
      , function (entry) {
        move(entry
          , window.fs.root
          , newPath
          , cb)
      }
      , function (err) {
        if (err.code === 11) { // TYPE_MISMATCH_ERR
          window.fs.root.getDirectory(oldPath
            , {}
            , function (entry) {
              move(entry
                , window.fs.root
                , newPath
                , cb)
            }
            , function (err) {
              cb(err)
            })
        } else {
          cb(err)
        }
      })
  })
}

function move (entry, root, newPath, cb) {
  entry.moveTo(root
    , newPath
    , function () {
      cb(null)
    }
    , function (err) {
      cb(err)
    })
}

exports.copy = function (oldPath, newPath, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (err) {
      cb(err)
      return
    }
    window.fs.root.getFile(oldPath
      , {}
      , function (entry) {
        var lastSlashIndex = newPath.lastIndexOf('/')
        var newName
        if (lastSlashIndex !== -1) {
          newName = newPath.substring(lastSlashIndex + 1)
          window.fs.root.getDirectory(newPath.substring(0, lastSlashIndex)
            , {}
            , function (dirEntry) {
              finish(dirEntry)
            }
            , function (err) {
              cb(err)
            })
        } else {
          newName = newPath
          finish(window.fs.root)
        }
        function finish (parent) {
          entry.copyTo(parent
            , newName
            , function (entry) {
              cb(null)
            }
            , function (err) {
              cb(err)
            })
        }
      }
      , function (err) {
        cb(err)
      })
  })
}

exports.getURL = function (path, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (err) {
      cb(err)
      return
    }
    window.fs.root.getFile(path
      , {}
      , function (entry) {
        cb(null, entry.toURL())
      }
      , function (err) {
        cb(err)
      })
  })
}

exports.getRoot = function (cb) {
  nativeUtil.whenFsReady(function (err) {
    if (err) {
      cb(err)
      return
    }
    window.fs.root.getFile('rootReference.txt'
      , { create: true }
      , function (entry) {
        var url = entry.toURL()
        var root = url.slice(0, url.lastIndexOf('/') + 1)
        cb(null, root)
      }
      , function (err) {
        cb(err)
      })
  })
}

exports.readdir = function (path, cb) {
  nativeUtil.whenFsReady(function (err) {
    if (err) {
      cb(err)
      return
    }
    window.fs.root.getDirectory(path
      , {}
      , function (dirEntry) {
        var reader = dirEntry.createReader()
        reader.readEntries(function (entries) {
          var names = []
          var l = entries.length
          var i
          var name
          for (i = 0; i < l; i += 1) {
            name = entries[i].fullPath
            if (name.lastIndexOf('/') === name.length - 1) {
              name = name.slice(0, -1)
            }
            if (name[0] === '/') {
              name = name.slice(1)
            }
            names.push(name)
          }
          cb(null, names)
        }
          , function (err) {
            cb(err)
          })
      }
      , function (err) {
        cb(err)
      })
  })
}
