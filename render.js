'use strict'
require('./')
const brender = require('brisky-core/render')
const ua = require('vigour-ua/navigator')
const parser = require('case-parser')
const uacases = require('ua-cases')
const cases = uacases(ua)

module.exports = function render (elem, state, casesArg, cb) {
  if (typeof casesArg === 'function') {
    cb = casesArg
  }

  if (casesArg) {
    for (let i in casesArg) {
      cases[i] = casesArg[i]
    }
  }

  elem = parser(elem, cases)
  addClasses(elem)
  return brender(elem, state, cb)
}

function addClasses (elem) {
  const elemClass = elem.class
  const classes = elemClass ? typeof elemClass === 'string' ? { val: elemClass } : elemClass : {}
  for (let i in cases) {
    if (cases[i]) {
      classes[i.slice(1)] = true
    }
  }
  if (ua.webview === 'cordova') {
    classes.cordova = true
  }
  elem.class = classes
}
