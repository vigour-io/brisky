try {
    var cordova = require('../../lib/cordova')
    function notify () {
        var args = arguments
        cordova.whenReady(function () {
            p = document.createElement('p')
            p.appendChild(
                document.createTextNode([].slice.call(args).join(': '))
            )
            document.getElementById('messages').appendChild(p)
        })
    }

    var fs = require('../../')
        , filePath = 'out.txt'
        , nonFilePath = 'nothingHere.txt'
        , fileContents = "File writer's block"
        , url = "https://api.themoviedb.org/3/search/movie?api_key=1858b4fe727192fef95bf123deab5353&query=Mud"
        , downloadTarget = 'out2.txt'
        , nonDirPathRoot = 'i'
        , nonDirPath = '/dont/exists'

    fs.getRoot(function (err, root) {
        if (err) {
            notify('FAIL', 'get root', JSON.stringify(err))
        } else {
            notify('PASS', 'get root', root)
        }
    })

    fs.writeFile(filePath, fileContents, function (err) {
        if (err) {
            notify('FAIL', 'write file', JSON.stringify(err))
        } else {
            notify('PASS', 'write file')
            fs.copy(filePath, 'copied.txt', function (err) {
                if (err) {
                    notify('FAIL', 'copy file', JSON.stringify(err))
                } else {
                    notify('PASS', 'copy file')
                    fs.readFile('copied.txt', function (err, data) {
                        if (err) {
                            notify('FAIL', 'read file', JSON.stringify(err))
                        } else {
                            notify('PASS', 'read file', JSON.stringify(data))
                        }
                    })
                }
            })
        }
    })

    fs.writeFile(downloadTarget
        , url
        , function (err) {
            if (err) {
                notify('FAIL', 'write url', JSON.stringify(err))
            } else {
                notify('PASS', 'write url')
                fs.rename(downloadTarget, 'renamed.txt', function (err) {
                    if (err) {
                        notify('FAIL', 'file rename', JSON.stringify(err))
                    } else {
                        notify('PASS', 'file rename')
                        fs.getURL('renamed.txt', function (err, url) {
                            if (err) {
                                notify('FAIL', 'getURL', JSON.stringify(err))
                            } else {
                                notify('PASS', 'getURL', url)
                            }
                        })
                        fs.readFile('renamed.txt', function (err, data) {
                            if (err) {
                                notify('FAIL', 'read downloaded', JSON.stringify(err))
                            } else {
                                notify('PASS', 'read downloaded'/*, data*/)
                            }
                        })
                    }
                })
            }
        })

    fs.readFile(url, function (err, data) {
      if (err) {
        notify('FAIL', 'read url', JSON.stringify(err))
      } else {
        notify('PASS', 'read url'/*, JSON.stringify(data)*/)
      }
    })

    fs.exists(filePath, function (exists) {
        if (exists) {
            notify('PASS', 'exists on existing file')
        } else {
            notify('FAIL', 'exists on existing file', 'pass if write file failed')
        }
    })

    fs.exists(nonFilePath, function (exists) {
        if (exists) {
            notify('FAIL', 'exists on inexistant file')
        } else {
            notify('PASS', 'exists on inexistant file')
        }
    })

    fs.mkdirp(nonDirPathRoot + nonDirPath, function (err) {
        if (err) {
            notify('FAIL', 'mkdirp')
        } else {
            notify('PASS', 'mkdirp')
            fs.readdir(nonDirPathRoot, function (err, files) {
                if (err) {
                    notify('FAIL', 'readdir', JSON.stringify(err))
                } else {
                    notify('PASS', 'readdir', JSON.stringify(files))
                    fs.rename(nonDirPathRoot, 'renamedDir', function (err) {
                        if (err) {
                            notify('FAIL', 'rename on a directory', JSON.stringify(err))
                        } else {
                            notify('PASS', 'rename on a directory')
                            fs.remove('renamedDir', function (err) {
                                if (err) {
                                    notify('FAIL', 'remove on existing directory', JSON.stringify(err))
                                } else {
                                    notify('PASS', 'remove on existing directory')
                                    fs.exists(nonDirPathRoot + nonDirPath, function (exists) {
                                        if (exists) {
                                            notify('FAIL', 'either exists is broken, or remove on existing directory fails, or rename on directory fails')
                                        } else {
                                            notify('PASS', 'Existing directory indeed removed')
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    fs.mkdirp('replaceSrc', function (err) {
        if (err) {
            notify('1. FAIL', JSON.stringify(err))
        } else {
            notify('1. PASS')
            fs.writeFile('replaceSrc/file.txt', "T'entends?", function (err) {
                if (err) {
                    notify('2. FAIL', JSON.stringify(err))
                } else {
                    notify('2. PASS')
                    fs.remove('replaceDest', function (err) {
                        if (err) {
                            notify('3. FAIL', JSON.stringify(err))
                        } else {
                            notify('3. PASS')
                            fs.rename('replaceSrc', 'replaceDest', function (err) {
                                if (err) {
                                    notify('4. FAIL', JSON.stringify(err))
                                } else {
                                    notify('4. PASS')
                                    fs.readFile('replaceDest/file.txt', function (err, data) {
                                        if (err) {
                                            notify('5. FAIL', JSON.stringify(err))
                                        } else {
                                            notify('5. PASS', data)
                                            fs.copy('replaceDest/file.txt'
                                                , 'replaceDest/copy.txt'
                                                , function (err) {
                                                    if (err) {
                                                        notify('6. FAIL', JSON.stringify(err))
                                                    } else {
                                                        notify('6. PASS')
                                                        fs.readFile('replaceDest/copy.txt', function (err, data) {
                                                            if (err) {
                                                                notify('7. FAIL', JSON.stringify(err))
                                                            } else {
                                                                notify('7. PASS', data)
                                                            }
                                                        })
                                                    }
                                                })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    fs.remove('asdfgssadsfdhsd', function (err) {
        if (err) {
            notify('FAIL', 'remove on inexistent directory', JSON.stringify(err))
        } else {
            notify('PASS', 'remove on inexistent directory')
        }
    })
} catch (e) {
    alert(e)
}
