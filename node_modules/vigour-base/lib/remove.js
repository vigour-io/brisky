'use strict'
var Base = require('./')
var Event = require('vigour-event')
/**
 * @function removeUpdateParent
 * remove base from parent
 * @memberOf Base#
 * @param {base} parent if not defined returns true
 * @param {event} event passedon event
 * @param {base} context checks if context has to be resolved
 * @return {boolean|undefined} if true nothing happened
 */
exports.removeUpdateParent = function (parent, event, context) {
  if (this.key === null) {
    return
  }
  if (parent[this.key] === null) {
    return true
  }
  if (context) {
    if (this._context) {
      this.resolveContext(null, event, context)
    }
  } else {
    parent[this.key] = null
    // this.clearContext()
  }
}

/**
 * @function removeProperty
 * removeProperty from a base
 * @memberOf Base#
 * @param {property} base property to be removed
 * @param {key} key of the property
 * @param {event} event passedon event
 * @param {base} context checks if context has to be resolved
 * @param {nocontext} [boolean] dont resolveContext when true
 * @return {boolean|undefined} if true nothing happened
 * @todo how to get rid of the non-enum stuff?
 * @todo cleanup and make faster
 * @todo system for excludes (e.g. noremovable or something)
 */
exports.removeProperty = function (property, key, event, nocontext) {
  if (
    property instanceof Base &&
    key !== '_context' &&
    this.hasOwnProperty(key) &&
    property._parent === this
  ) {
    property.clearContext()
    property.remove(event, nocontext)
  }
  this[key] = null
}

/**
 * @function removeProperties
 * remove properties from base
 * @memberOf Base#
 * @param {event} event passedon event
 * @param {nocontext} [boolean] dont resolveContext when true
 */
exports.removeProperties = function (event, nocontext) {
  var target = this
  // this will be fixed as well -- dont need this shit
  // again lets use a keys array super efficient
  for (let key in target) {
    if (
      // this can be a bit cleaner.....
      // make this 1000x faster, and add a system for this blacklisted[key]
      key !== '_parent' &&
      key !== 'key' &&
      key !== '_uid' &&
      key !== '_key' &&
      key !== '__input' &&
      key !== '_lstamp' &&
      key !== 'storedmap' &&
      key !== '_hashCache' &&
      key !== '_hashedpath' &&
      key !== 'cachedSyncPath'
    ) {
      if (this.hasOwnProperty('_' + key) || this.hasOwnProperty(key)) {
        target = target.removeProperty(target[key], key, event, nocontext) || target
      } else if (target[key] && target[key].clearContext) {
        target[key].clearContext()
      }
    }
  }
  target.__input = null
}

/**
 * @function removeInternal
 * remove properties from base
 * @memberOf Base#
 * @param {event} event passedon event
 * @param {nocontext} [boolean] dont resolveContext when true
 * @param {noparent} [boolean] dont remove from parent when true
 * @return {true|undefined} if true no updates happened on parent
 * @todo return a base when a change happened (consistency)
 */
exports.removeInternal = function (event, nocontext, noparent) {
  var parent = this._parent
  if (!noparent && !nocontext && this._context) {
    return this.removeUpdateParent(this.parent, event, this._context)
  } else {
    if (!noparent && parent) {
      this.removeUpdateParent(parent, event)
    }
    this.removeProperties(event, nocontext, noparent)
    this._parent = null
  }
  this.clearContext()
}

/**
 * @function remove
 * remove a base
 * @memberOf Base#
 * @param {event} event passedon event
 * @param {nocontext} [boolean] dont resolveContext when true
 * @param {noparent} [boolean] dont remove from parent when true
 * @return {true|undefined} if true no updates happened
 * @todo return a base when a change happened (consistency)
 */
exports.remove = function (event, nocontext, noparent) {
  var ret = this.removeInternal(event, nocontext, noparent)
  if (this.removeFromInstances) {
    this.removeFromInstances(event)
  }
  return ret
}

/**
 * @function clear
 * clears all properties and values of a base
 * @memberOf Base#
 * @param {event} event passedon event
 * @todo return a base when a change happened (consistency)
 */
exports.clear = function (event) {
  this.__input = void 0
  var trigger
  if(event === void 0) {
    trigger = true
    event = new Event('clear')
  }
  this.each((property) => {
    property.remove(event)
  })
  if (trigger) {
    event.trigger()
  }
}
