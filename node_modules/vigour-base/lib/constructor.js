'use strict'
var Base = require('./')

/**
* @function setParent
* Adds base to a parent, sets key on base
* @param  {*} val set value of the base object
* @param  {Event} [event] pass event, on base base constructor defaults to false
* @param  {base} [parent] parent object
* @param  {string} [key] key thats being set on a parent
* @return {base}
*/
exports.setParent = function (val, event, parent, key) {
  if (parent) {
    this._parent = parent
  } else if (this._parent) {
    this._parent = null
  }
  if (key !== void 0) {
    this.key = key
  }
  return this
}

/**
* @function ChildConstructor
* Default Constructor used for children of base object
*/
exports.ChildConstructor = Base

// temp solution see how much better we like this (a lot i think)
exports.Child = {
  get () {
    return this.ChildConstructor
  }
}

/**
* @function generateConstructor
* Generates a constructor function
* @return {function}
*/
exports.generateConstructor = function () {
  // use ...args es6 notation
  return function derivedBase () {
    this.clearContext()
    Base.apply(this, arguments)
  }
}

/**
* @property Constructor
* Creates a constructor when called
* Adds context getters for each field
* @return {function}
*/
exports.Constructor = {
  set (val) {
    // candidate to remove this set-- this._Constructor
    this._Constructor = val
  // this._Constructor.prototype = this
  },
  get () {
    if (!this.hasOwnProperty('_Constructor')) {
      for (let key in this) {
        // all nested keys as well :/
        // here we also need to add instances? somehwere at least...
        this.createContextGetter(key)
      }
      let Constructor = this._Constructor = this.generateConstructor()
      Constructor.prototype = this
    }
    return this._Constructor
  }
}
