'use strict'
var Base = require('../')
var descriptors = require('vigour-util/descriptors')
// CLEAN UP needs tests, does not take all edge cases into account such as overrides
module.exports = function (val, event) {
  this.Constructor
  var properties = val.properties
  var myProperties = this.properties
  // var overrides = val.overrides
  var definitions = descriptors(val)
  var mydefs = descriptors(this)
  for (let i in properties) {
    if (properties[i] !== myProperties[i] && i !== 'binds') {
      // console.warn('different property!', i)
      this.properties = { [i]: properties[i] }
    }
  }
  for (let i in val) {
    if (definitions[i]) {
      // console.log('collision with definitions', i)
      delete definitions[i]
    }
    if (i[0] === '_' && !properties[i]) {

    } else {
      if (i === 'overrides') {
        // console.warn('inject: overrides not handled yet boys gurk!')
      } else {
        if (this[i] !== val[i]) {
          // console.log('set it!', i)
          // console.log('also check for merge!')
          if (this[i]) {
            if (this[i] instanceof Base) {
              // console.log('merge inject', i)
              this[i].inject(val[i], event)
            }
            // this[i]
          } else {
            let set = val[i]
            if (set instanceof Base) {
              set = new set.Constructor({ useVal: true }, event, this)
              this.set({ [i]: set }, event)
            } else {
              // console.log('inject: not an instance of base what is it?', i)
              // this[i] = i
              if (myProperties[i] || properties[i]) {
                // console.log('inject property', i)
                this.set({ [i]: set }, event)
              }
            }
          }
        }
      }
    }
  }
  for (let i in definitions) {
    if (i !== '_injected') {
      if (!compareDescriptors(definitions[i], mydefs[i])) {
        // console.log('DIFFERENT descriptor!', i, definitions[i], mydefs[i])
        Object.defineProperty(this, i, definitions[i])
      }
    }
  }
}

function compareDescriptors (a, b) {
  if (a && !b) {
    return false
  }
  for (let i in a) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

