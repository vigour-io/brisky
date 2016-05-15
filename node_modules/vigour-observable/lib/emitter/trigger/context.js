'use strict'
/*
**** WARNING ****
* cannot use double inheritance paths
* var Thing = new Elem({ text: })
* var Page = new Elem({ gurk: { thing: new Thing }})
* when you start making instances of page.gurk -- gurk will be used as top level -- if this become a problem we have to think of something
* can be much unified with element and subs i supose -- its just storing common ancestor paths exactly what we want for subs
* how to do how to do
* prob just storing them
* has to be greedy and smarter in doing things
*
* **** WARNING 2 ****
* for condition when using defered events context will be pretty much lost (dont want to store on defaut event)
* the condition event will handle this itself
*
* **** WARNING 3 ****
* context does not get restored -- dont want to store context chains
*/
module.exports = function emitContext (parent, bind, event, data, emitter, context, prevpath) {
  let parentInstances
  let path

  while (parent) { // !parent._context FIX THIS!
    parentInstances = parent.getInstances()

    if (parent.hasOwnProperty('_isChild')) {
      // parent.emit('data', data, event)
      // console.error('HIT', parent.path, parent._isChild)
      if (parent.handleContextChild) {
        parent._isChild.handleContextChild(data, event, context)
      }
    }

    if (parentInstances) {
      let pathlength
      for (let i = 0, length = parentInstances.length; i < length; i++) {
        let instance = parentInstances[i]

        // double context
        let target = instance
        if (
          !context ||
          instance === context
        ) {
          if (path) {
            if (!pathlength) {
              pathlength = path.length - 1
            }
            for (let j = pathlength; j >= 0; j--) {
              target = target[path[j]]
              if (!target) {
                break
              }
            }
          }

          if (target && target[bind.key] === bind) {
            if (!emitter) {
              throw new Error('no emitter! emit context' + bind._path.join('.'))
            }
            emitContext(instance, bind, event, data, emitter, false, path)
            emitter.execInternal(bind, event, data)
          }

          if (context) {
            return
          }
        }
      }
      // ********* NEEDS PERF OPTIMIZATION ************
      // really heavy think of a solution later for now lets celebrate that it works!
      // becomes espacialy problematic with many parents
      return
    }
    if (!path) {
      path = prevpath ? prevpath.concat() : []
    }
    path.push(parent.key) // reuse!!! godamn must be easy
    parent = parent._parent
  }
}
