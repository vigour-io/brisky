'use strict'
var Base = require('./')
var isPlainObj = require('vigour-util/is/plainobj')

/**
 * @function setValueInternal
 * @memberOf Base#
 * @param  {*} val The value that will be set on __input
 * @param {Event} [event] Current event
 * @return {Base} this
 */
exports.setValueInternal = function (val, event) {
  this.__input = val
  return this
}

/**
 * @function setValue
 * @memberOf Base#
 * @param {*} val The value that will be set on __input
 * @param {Event} [event] Current event
 * @param {resolveContext} [boolean] tells if context has to be resolved
 * @return {Base|undefined} if undefined no change happened
 */
exports.setValue = function (val, event, resolveContext) {
  if (val === this.__input) {
    // no change dont do anything
    return
  }
  if (val === null) {
    let r = this.remove(event)
    return r || this
  }
  if (resolveContext) {
    return this.resolveContext(val, event)
  } else {
    return this.setValueInternal(val, event)
  }
}

/**
 * @function set
 * @memberOf Base#
 * @param  {*} val The value that will be set on Base
 * @param  {Event} [event]
 *   when false events are not executed
 * @param  {nocontext} [boolean] dont resolveContext when true
 * @param  {escape} [boolean] escape reserved fields
 * @return {Base|undefined} if undefined no change happened
 */
exports.set = function (val, event, nocontext, escape) {
  var base = this
  var resolveContext = !nocontext && base._context
  if (isPlainObj(val)) {
    if (resolveContext) {
      base = base.resolveContext(val, event)
    } else {
      let changed
    // this is a lil dirt for element -- will make this into real functions
      if (val.components) {
        if (base.setKey('components', val.components, event, nocontext, escape)) {
          changed = true
        }
      }

      if (val.inject) {
        if (base.setKey('inject', val.inject, event, nocontext, escape)) {
          changed = true
        }
      }

      for (let key in val) {
        if (base.__input === null) {
          break
        }
        if (key === 'inject' || key === 'components') {

        } else if (key === 'val') {
          if (base.setValue(val[key], event, resolveContext)) {
            changed = true
          }
        } else {
          if (base.setKey(key, val[key], event, nocontext, escape)) {
            changed = true
          }
        }
      }
      if (!changed) {
        return
      }
    }
  } else {
    base = base.setValue(val, event, resolveContext)
  }
  return base
}

/**
 * removes context -- for base this just means nulling one property,
 * however observables need to fire remove events for context
 * @param  {[type]} key   [description]
 * @param  {[type]} event
 * @return {[type]}
 */
exports.contextRemove = function (key, event) {
  this[key] = null
  return this
}

/**
 * @function setKeyInternal
 * @memberOf Base#
 * @todo find a better name
 * @param  {String} key Key to be set on base
 * @param  {*} [val]
 *   The value that will be set on base[key]
 *   uses .set internaly
 *   checks for ._useVal|.useVal on val to overwrite default behaviour
 * @param  {Base} [property]
 *   property if base[key] is already defined
 * @param  {Event} [event]
 *   adds emiters to event if event is defined
 *   when false event emiters are not added
 * @param {nocontext} [boolean] dont resolveContext when true
 * @todo double check if a property set returning undefined is ok
 * @return {Base|undefined} this, if undefined no relevant change happened
 */
exports.setKeyInternal = function (key, val, property, event, nocontext, escape) {
  // needs optmizations of course

  // this has to be configurable check if type is in properties
  if (property && val && isPlainObj(val) && val.type) {
    property.remove(false)
    property = void 0
  }
  // finish all then clean

  if (property) {
    // the noInstance is a bit harsh!
    if (property._parent !== this && !property.noInstance) {
      if (val === null) {
        return this.contextRemove(key, event)
      } else {
        let Constructor = property.Constructor
        if (escape && !Constructor) {
          if (typeof escape === 'string') {
            key = escape + key
          } else {
            key = 'escaped_' + key
          }
          this.setKeyInternal(key, val, this[key], event, nocontext, escape)
        } else if (Constructor === false) {
          property.set(val, event, void 0, escape)
        } else if (!Constructor) {
          throw new Error('cannot set property "' + key + '", on "' + this.path + '" it\'s reserved')
        } else {
          this[key] = new Constructor(void 0, false, this, key, escape)
          this[key].set(val, event, nocontext, escape)
          return this[key]
        }
      }
    } else {
      property.set(val, event, nocontext, escape)
      return
    }
  } else {
    if (val !== null) {
      if (val && isPlainObj(val) && val.type) {
        val = this.getType(val, event, key, void 0, escape)
      }
      this.addNewProperty(key, val, property, event, escape)
      return this
    } else {
      return
    }
  }
}

/**
 * @function addNewProperty
 * @memberOf Base#
 * @param {String} key Key to be set on new property
 * @param {*} val The value that will be set on __input
 * @param {Event} [event] Current event
 * @param {property} [base] Property to be set
 * @todo requires perf optmizations
 * @return {Base} this
 */
exports.addNewProperty = function (key, val, property, event, escape) {
  val = this.getPropertyValue(val, event, this, key, escape)
  this[key] = val
  var parent = this
  while (parent) {
    if (parent.hasOwnProperty('_Constructor')) {
      this.createContextGetter(key)
      parent = null
    } else {
      parent = parent._parent
    }
  }
}

/**
 * @function checkUseVal
 * checks the useVal of a property
 * useVal will override default behaviour and use the value directly as property
 * @memberOf Base#
 * @return {*} returns useval property
 */
function checkUseVal (useVal, val, event, parent, key) {
  val = useVal === true ? val : useVal
  if (val instanceof Base) {
    if (!val.hasOwnProperty('_parent') || val._parent === parent) {
      val.key = key
      val._parent = parent
      return val
    }
  } else {
    return val
  }
}

/**
 * @function getPropertyValue
 * checks if property thats being set has a useVal or UseConstructor
 * else creates a new instance of ChildConstructor
 * useVal will override default behaviour and use the value directly as property
 * @memberOf Base#
 * @return {Base} returns new instance of property Constructor
 */
exports.getPropertyValue = function (val, event, parent, key, escape) {
  // do type check in here
  if (val) {
    let useVal = (!val.hasOwnProperty('_parent') || val._parent === parent) && (val._useVal || val.useVal)
    if (useVal) {
      let prop = checkUseVal(useVal, val, event, parent, key)
      if (prop) {
        return prop
      }
    }
  }
  return parent.ChildConstructor
    ? new parent.ChildConstructor(val, event, parent, key, escape)
    : val
}

/**
 * @function setKey
 * @memberOf Base#
 * Uses setKeyInternal or flag[key]
 * @param  {String} key
 *   Key set on base using setKeyInternal
 *   Checks if a match is found on Base.flags
 * @param  {*} [val]
 *   The value that will be set on base[key]
 * @param  {Event} [event] Current event
 * @param  {nocontext} [boolean] dont resolveContext when true
 * @return {Base|undefined} if undefined no change happened
 */
var match = /\:([a-z\d]+)$/i
exports.mapProperty = function (key, val, event, nocontext, escape) {
  let result = typeof key === 'string' && key.match(match)
  return result && result[1]
}

exports.setKey = function (key, val, event, nocontext, escape) {
  var type = key
  if (escape) {
    if (key === 'parent' || key === 'path' || key === 'properties') {
      if (typeof escape === 'string') {
        key = escape + key
      } else {
        key = 'escaped_' + key
      }
    }
  } else if (
    this.properties[key] ||
    (
      (type = this.mapProperty(key, val, event, nocontext, escape)) &&
      this.properties[type]
    )
  ) {
    // have to handle type here as well if prop is contructor thing
    return this.properties[type].call(this, val, event, nocontext, key, escape)
  }

  return this.setKeyInternal(key, val, this[key], event, nocontext, escape)
}
