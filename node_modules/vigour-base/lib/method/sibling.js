'use strict'
var Base = require('../')

exports.define = {
  previousSibling (infinite, exclude) {
    var prev
    var parent = this.parent
    if (parent) {
      let index = this.index && this.index.val || this.index
      if (typeof index === 'number') {
        let prevIndex = index - 1
        let previous = parent.each(function (prop) {
          var i = prop.index && prop.index.val || prop.index
          if (i === prevIndex) {
            return prop
          }
        })
        if (previous) {
          return previous
        }
      }
      return parent.each((prop, key) => {
        if (prop === this) {
          return prev
        }
        if (prop instanceof Base && key !== exclude) {
          prev = prop
        }
      }) || infinite && prev
    }
  },
  nextSibling (infinite, exclude) {
    var next
    var parent = this.parent
    if (parent) {
      let index = this.index && this.index.val || this.index
      if (typeof index === 'number') {
        let nextIndex = index + 1
        let next = parent.each(function (prop) {
          var i = prop.index && prop.index.val || prop.index
          if (i === nextIndex) {
            return prop
          }
        })
        if (next) {
          return next
        } else {
          return infinite && parent.firstChild(exclude)
        }
      }
      return parent.each((prop, key) => {
        if (prop instanceof Base && next && key !== exclude) {
          return prop
        }
        if (prop === this) {
          next = this
        }
      }) || infinite && parent.firstChild(exclude)
    }
  },
  firstChild (exclude) {
    return this.each((prop, key) => {
      if (prop instanceof Base && key !== exclude) {
        let index = prop.index && prop.index.val || prop.index
        if (typeof index === 'number') {
          let lowestIndex = index
          let lowestKey = key
          this.each(function (prop, key) {
            var i = prop.index && prop.index.val || prop.index
            if (i < lowestIndex) {
              lowestKey = key
              lowestIndex = index
            }
          })
          return this[lowestKey]
        }
        return prop
      }
    })
  }
}
