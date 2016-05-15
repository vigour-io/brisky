'use strict'
var hash = require('vigour-util/hash')
/**
 * @property uid
 * injectable for generation of uids -- handy if you want weakmap-like behaviour
 * @memberOf Base#
 * @param {object} val
*/
var uid = 0
exports.define = {
  uid: {
    get () {
      if (!this.hasOwnProperty('_uid')) {
        uid++
        this._uid = uid
      }
      return this._uid
    }
  },
  // uid: {
  //   get () {
  //     if (!this.hasOwnProperty('_uid')) {
  //       if (this._parent) {
  //         let parent = this
  //         let str = ''
  //         while (parent && parent.key) {
  //           str += parent.key
  //           parent = parent._parent
  //         }
  //         // have to do this smarter -- make this when .engine in element before that its irrelevant anyways
  //         // console.log('yo!', str, hash(str), this.path.join('.'))
  //         this._uid = hash(str) // hash // will create collisions -- so thats not so good -- make entry points on val?
  //       }
  //     }
  //     return this._uid || 0// 'h' + (++cnt)
  //   }
  // },
  getHashedPath (cache) {
    // console.log('get cache!', this.path.join('.'), 'cntx:', this._context && this._context._path.join('.'))
    if (this._context) {
      if (!cache) {
        cache = this.contextMap()
      }
      if (cache.val) {
        return cache.val
      }
      let parent = this
      let str = ''
      while (parent && parent.key) {
        str += '.' + parent.key
        let lparent = parent
        let cntx = parent._context
        let level = parent._contextLevel
        parent = parent.parent
        if (lparent._context !== cntx) {
          lparent._context = cntx || null
          lparent._contextLevel = level || null
        }
      }
      cache.val = hash(str)
      // console.log(this.path.join('.'), hash(this.path.join('.')))
      // return hash(this.path.join('.')) // cache.val
      return cache.val
    } else {
      if (!this.hasOwnProperty('_hashedpath')) {
        if (this._parent) {
          let parent = this
          let str = ''
          while (parent && parent.key) {
            str += '.' + parent.key
            parent = parent._parent
          }
          // have to do this smarter -- make this when .engine in element before that its irrelevant anyways
          // console.log('yo!', str, hash(str), this.path.join('.'))
          this._hashedpath = hash(str) // hash // will create collisions -- so thats not so good -- make entry points on val?
        }
        return this._hashedpath || 'NO!!!!!'
      }
      return this._hashedpath
    }
  }
}
