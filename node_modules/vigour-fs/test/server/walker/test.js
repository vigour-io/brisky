#!/usr/bin/env node
var fs = require('../../../')
  , log = require('npmlog')

fs.walk(
  '../'
, { exclude:[ /\.js$/, /^\./ ] 
  , method:function(path, field, files, obj, current) {
      // console.log(path, field, files, obj, current)
    }
  }
, function(err,obj) {
  console.log('error:', err)
  console.log('result:',JSON.stringify(obj,false,2))
})

// fs.walk(
//   __dirname+'/files'
// , { exclude:/$\.js/ }
// , function(err,obj) {
//   console.log('XXX',err,JSON.stringify(obj,false,2))
// })

