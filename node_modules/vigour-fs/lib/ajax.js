/* global FormData, XMLHttpRequest */

/*!
 * @license Copyright (c) 2012-2014, Vigour. All rights reserved.
 * @author: Jim de Beer, jim@vigour.io
 */
var _a = 'addEventListener'
var util = require('./vigourjsutil')
var cnt = 0

/**
 * xhr wrapper, adds some nice extras such as multiple requests to a single api call
 * xhr wrapper will include jsonp in a later stage
 * @method extend
 * @param   {String|Array} params.url         Specifiy the url, array fetches multiple url's
 * @param   {String}   [params.api]           Repeat this string for the url that needs to be called
 * @param   {Function} [params.complete]      Specify a callback when an array is passed to url complete is called when all items are complete
 * @param   {Function} [params.error]         On error callback
 * @param   {Function} [params.change]        Function called on xhr.onreadystatechange
 * @param   {Boolean}  [params.async]         If set to false will call an syncronous request (not recommended!)
 * @param   {String}   [params.user]          User parameter
 * @param   {String}   [params.pass]          Password parameter
 * @param   {Boolean}  [params.parse]         If set to false will not try to parse response to JSON
 * @param   {String}   [params.type|.method]  POST or GET, default is get;
 * @param   {String}   [params.contentType]   request content type default id "application/x-www-form-urlencoded"
 * @param   {String}   [params.mime]          defines mime type
 * @param   {Function} [params.progress]      Progress callback
 * @param   {Object}   [params.header]        Sets request headers
 * @param   {*}        [params.data]          Pass data to the request, defaults to ? on get;
 */

var iframes
var ajax = module.exports = function (params, urlset) {
    var _url = params.url
    if (!urlset && _url instanceof Array) {
      params.m = function () {
        if ((++params.r) === params.n) {
          for (var i = 0, arr = [], l = _url.length; i < l; arr.push(params.d[_url[i++]]));
          params.complete(arr)
        }
      }
      params.r = 0
      params.d = {}
      for (var i = 0, l = params.n = _url.length; i < l; module.exports(params, _url[i++]));
    } else {
      var data = params.data
      var encode = params.encode
      var url = (params.api || '') + (urlset || _url)
      var headers = params.headers
      var success = params.complete
      var progress = params.progress
      var error = params.error
      var change = params.change
      var mime = params.mime
      var user = params.user
      var pass = params.pass
      var parse = params.parse
      var iframe = params.iframe
      var reqdata = null
      var fallback = params.fallback
      var fallbackIndex = params._fallbackIndex
      var method = params.type || params.method || 'GET'
      var contentType = params.contentType || encode === 'json'
          ? 'application/json'
          : 'application/x-www-form-urlencoded'
      var async = params.async === false
      var xhr = new XMLHttpRequest()

      // ------------------------------------------------------------ DATA
      if (iframe) {
        cnt++
        var elem
        var msg = {}
        var reqid = cnt

        for (var field in params) {
          if (field !== 'error' && field !== 'iframe' && field !== 'complete') {
            msg[field] = params[field]
          }
        }
        // msg = JSON.stringify(msg)
        // console.error(iframe)
        // console.log('msg',msg)
        var setmsg = function () {
          var elem
          iframes[iframe].onload = null
          var msgcomplete = function (e) {
            // console.error('IFRAME REQ MSG COMPLETE',e.data)
            if (e.data) {
              var d
              try {
                d = JSON.parse(e.data)
              } catch(e) {
                if (error) {
                  error(e)
                }
                return
              }
              if (d.id !== reqid) {
                return
              }
              if (d.err) {
                if (error) {
                  error(d.err)
                }
                return
              }
              var resp = d.msg
              if (success) {
                if (parse !== false) {
                  try {
                    resp = JSON.parse(resp)
                  } catch (e) {}
                }
                success(resp, e)
              }
              document.removeEventListener('message', msgcomplete)
            }
          }
          if (window.addEventListener) {
            document.addEventListener('message', msgcomplete, false)
            elem = iframes[iframe].contentWindow
            msg = JSON.stringify({
              msg: msg,
              id: reqid
            })
            elem.postMessage(msg, '*')
          }
        }

        if (!iframes) {
          iframes = {}
        }
        if (!iframes[iframe]) {
          elem = iframes[iframe] = document.createElement('iframe')
          elem.src = iframe
          elem.cListeners = [
            setmsg
          ]
          elem.onload = function () {
            for (var h in elem.cListeners) {
              elem.cListeners[h]()
            }
            elem.cListeners = null
          }
          elem.style.visibility = 'hidden'
          elem.style.width = '0px'
          elem.style.height = '0px'
          elem.style.position = 'absolute'
          document.body.appendChild(elem)
        } else if (iframes[iframe].cListeners) {
          iframes[iframe].cListeners.push(setmsg)
          // elem.cListeners[i]
        } else {
          setmsg()
        }
        return
      }

      if (data) {
        if (method === 'GET') {
          url += '?' + enCode(data, 'GET', encode)
        } else {
          reqdata = enCode(data, 'POST', encode)
        }
      }

      // ------------------------------------------------------------ METHOD, URL, ASYNC, USER & PASS
      xhr.open(method, url, async, user, pass)
      // ------------------------------------------------------------ HEADERS
      xhr.setRequestHeader('Content-Type', contentType)
      if (headers) {
        for (var f in headers) {
          xhr.setRequestHeader(f, headers[f])
        }
      }

      // ------------------------------------------------------------ EVENTS
      if (success) {
        xhr[_a]('load', function (e) {
          var resp = (e.target || e.srcElement).response
          if (parse !== false) {
            try {
              resp = JSON.parse(resp)
            } catch (e) {}
          }
          if (params.m) {
            params.d[urlset] = resp
            params.m()
          } else {
            success(resp, e)
          }
        }, false)
      }
      if (error) {
        if (!fallbackIndex) {
          params._fallbackIndex = 0
        }
        if (fallback && fallbackIndex !== fallback.length) {
          params._fallbackIndex++
          params = util.merge(params, fallbackIndex)
          ajax(params, urlset)
        } else {
          xhr[_a]('error', error, false)
        }
      }
      if (progress) {
        xhr[_a]('progress', progress, false)
      }
      if (change) {
        xhr.onreadystatechange = change
      }
      // ------------------------------------------------------------ MIME
      if (mime) {
        xhr.overrideMimeType(mime)
      }
      // ------------------------------------------------------------ SEND

      xhr.send(reqdata)
    }
  }

var enCode = ajax.encode = function (data, method, encode) {
  var result = ''

  if (encode === 'json') {
    result = JSON.stringify(data)
  } else if (data instanceof Object) {
    if (!util.isNode && (FormData && data instanceof FormData) && method !== 'GET') {
      result = data
    } else if (data instanceof Array) {
      result = JSON.stringify(data[f])
      if (encode === 'uri') result = encodeURIComponent(result)
    } else {
      for (var f in data) {
        var val = data[f]
        if (val instanceof Object) val = JSON.stringify(val)
        if (encode === 'uri') {
          f = encodeURIComponent(f)
          val = encodeURIComponent(val)
        }
        result += f + '=' + val + '&'
      }
      result = result.slice(0, -1)
    }
  } else {
    result = (encode === 'uri') ? encodeURIComponent(data) : data
  }
  // console.log('encoded:', result)
  return result
}
