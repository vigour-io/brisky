const { compute, puid, subscribe } = require('brisky-struct')
// use subscribe

// string hash

const getParent = (id, tree) => {
  var p = tree
  while (p) {
    if (p._ && (id in p._)) return p._[id]
    p = p._p
  }
}

const isStruct = t => t && typeof t === 'object' && t.inherits

const calc = t => typeof t === 'object'
  ? t.isTransformer ? t.transform(compute(t.struct)) : compute(t)
  : t

const remove = (tree, id) => {
  const c = tree._ && tree._[id] && tree._[id].c
  if (c) c.parentNode.removeChild(c)
}

const copy = (obj, copied) => {
  if (typeof obj === 'object') {
    copied = {}
    for (let key in obj) {
      copied[key] = copy(obj[key])
    }
    return copied
  } else {
    return obj
  }
}

const merge = (a, b) => {
  for (let key in b) {
    if (!(key in a)) {
      a[key] = b[key]
    } else {
      if (typeof b[key] === 'object') {
        if (typeof a[key] === 'object') {
          merge(a[key], b[key])
        } else {
          const val = a[key]
          a[key] = b[key]
          if (a.val) {
            console.log('double val', a.val, b.val, 'handle weight logic')
          }
          a.val = val
        }
      } else {
        if (typeof a[key] === 'object') {
          if (!a.val) {
            a.val = b[key]
          } else {
            console.log('double val', a.val, b.val, 'handle weight logic')
          }
        }
      }
    }
  }
  return a
}

// hub needs to send empty fields for any as well
const addSubscription = (component, s, subs, field, val, listener, isComponent, endpoint, id) => {
  // console.warn('addSubscription', field, subs, val)
  // do everything here appendChild etc also put it on the tree nowhere else
  // parent has to become id else it does not work

  if (field in subs) {
    // console.error('merge it')
    const target = subs[field]

    if (!isComponent && target._ && target._.properties && target._.properties[component.id]) {
      // console.error('allrdy added!')
      return
    }
    val = copy(val)

    if (!target._) target._ = {}
    if (isComponent) {
      if (!target._.components) target._.components = []
    } else {
      if (!target._.properties) target._.properties = {}
    }
    val = merge(target, val)
  } else {
    val = copy(val) // has to be copied
    subs[field] = val
    if (endpoint) {
      for (let i = 0; i < endpoint.length; i++) {
        val = val[endpoint[i]]
      }
    }

    if (isComponent) {
      // same for components i think...
      ;(val)._ = { components: [] }
    } else {
      ;(val)._ = { properties: {} }
    }
  }
  if (isComponent) {
    // add all this shit on the tree -- much better
    val._.components.push(listener, id)
  } else {
    val._.properties[component.id] = [ component, id ]
  }
}

const removeSubscription = (subs, field) => {
  console.log('removeSubscription', field, subs)
}

/*
- add / remove subs dynamicly (on mount component idea)
- make functions to determine if
*/

const findParent = (tree, id) => {
  while (tree) {
    if (tree._ && tree._[id]) {
      return tree._[id]
    }
    tree = tree._p
  }
}

const render = (component, s, element) => {
  // taking over element is a bit harder
  // component needs to create the app handle
  var app
  const subs = {
    val: 'property',
    _: {
      components: [
        component,
        puid(s)
      ]
      // createProperies: []
    }
  }

  const tree = {
    _: {
      [puid(s)]: {
        appendChild: node => {
          app = node
        }
      }
    }
  }

  subscribe(s, subs, (s, type, subs, tree) => {
    if (subs._) {
      if (type === 'new') {
        if (subs._.components) {
          if (!tree._) tree._ = {}
          for (let i = 0, len = subs._.components.length; i < len - 1; i += 2) {
            const component = subs._.components[i]
            const key = puid(s) + component.id
            const child = component.create(s, subs, tree, key)
            tree._[key] = child
            findParent(tree, subs._.components[i + 1]).appendChild(child)
          }
        }
      } else if (type === 'remove') {
        // this can be relevant for properties // def
      } else {
        if (subs._.properties) {
          for (let key in subs._.properties) {
            const props = subs._.properties[key]
            // you dont know the key.... s.key is wrong
            // need to map it... and store in props
            props[0].props[props[1]](s, subs, tree, props[0].id)
          }
        }
      }
    }
  }, tree)

  console.log(tree, subs)

  return app
  // return component.create(state)
}

const createTransformer = (val, transform) => {
  if (!isStruct(val)) {
    return transform(val)
  } else {
    return {
      isTransformer: true,
      struct: val,
      transform
    }
  }
}

exports.render = render
exports.remove = remove
exports.calc = calc
exports.isStruct = isStruct
exports.getParent = getParent
exports.addSubscription = addSubscription
exports.removeSubscription = removeSubscription
exports.createTransformer = createTransformer
exports.findParent = findParent
