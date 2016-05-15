'use strict'
var merge = require('lodash.merge')
var Base = require('./')
var isPlain = require('vigour-util/is/plainobj')
var _child = Base.prototype.properties.Child

function lookUpComponent (target, type, val, Constructor) {
  var result
  while (target) {
    if (target.components && target.components[type]) {
      result = target.components[type]
      if (isPlain(result)) {
        let check = result.type !== type && result.type && type && lookUpComponent(target, result.type || type, val, Constructor)
        if (check) {
          result = target.components[type] = new check.Constructor(result, false, target)
        } else {
          result = target.components[type] = new Constructor(result, false, target)
        }
      }
      return result
    }
    target = target._parent
  }
}

exports.define = {
  getType (val, event, key, nocontext, escape) {
    var type = val.type
    if (!type) {
      return val
    }
    let result = lookUpComponent(this, type, val, this.ChildType || this.ChildConstructor)
    if (result) {
      let r = new result.Constructor(val, event, this, key) //, this, key, escape)
      if (!r.useVal) {
        r.useVal = true
      }
      return r
    }
    return val
  }
}

exports.properties = {
  type: true,
  Child (val, event) {
    if (isPlain(val)) {
      // for (var i in val) {
      //   if (val[i] && val[i].type) {
      //     console.info('now do something special', i)
      //     val[i] = this.getType(val[i], event)
      //     console.log('!', val)
      //   }
      // }
      // need to do somethign like resolved or something
      val = this.getType(val, event)
    }
    _child.call(this, val, event)
  },
  components (val, event) {
    if (!this.components) {
      this.components = {}
    } else if (!this.hasOwnProperty('components')) {
      let old = this.components
      let n = {}
      for (let key in old) {
        n[key] = old[key]
      }
      this.components = n
    }
    if (val instanceof Array) {
      for (let i = 0, len = val.length; i < len; i++) {
        setComponent.call(this, val[i], event)
      }
    } else {
      setComponent.call(this, val, event)
    }
  }
}

function setComponent (val, event) {
  var comp = this.components
  for (var key in val) {
    if (val[key].type) {
      comp[key] = val[key]
    } else if (!comp[key]) {
      comp[key] = val[key]
    } else if (isPlain(comp[key])) {
      merge(comp[key], val[key])
    } else if (comp[key] instanceof Base) {
      comp[key].inject(val[key], event)
    }
  }
}
