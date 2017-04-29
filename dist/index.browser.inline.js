(function (global, process) { 
var $826337949_exports = {}
if (!global.briskystamp) {
  const bs = {}
  const ts = bs.ts = 535673248076
  var tsInProgress = false
  var cnt = 0
  var d
  var on

  global.briskystamp = bs

  bs.inProgress = false
  bs.offset = 0

  bs.setOffset = val => {
    tsInProgress = false
    bs.offset = val
  }

  const ms = () => {
    if (!tsInProgress) {
      cnt = 0
      d = Date.now() - ts + bs.offset
      tsInProgress = true
      setTimeout(() => { tsInProgress = false })
    } else {
      d += ++cnt / 9999
    }
    return d
  }

  bs.create = override => override || ms()

  bs.on = fn => {
    if (!on) {
      on = [ fn ]
    } else {
      on.push(fn)
    }
  }

  bs.clear = () => { on = false } // rename this to stop

  bs.close = () => {
    if (on && !bs.inProgress) {
      bs.inProgress = true
      for (let i = 0; i < on.length; i++) { on[i]() }
      bs.inProgress = on = false
    }
  }

  bs.parse = stamp => stamp > 1e6 ? (stamp + ts) : stamp
}

var $826337949_$4024611344 = global.briskystamp


var $826337949 = $826337949_$4024611344
;var $2180032073_exports = {}
"use strict";

function $2180032073_hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

var $2180032073 = $2180032073_hash;

;var $1662971556_exports = {}

const $1662971556_$2621634261_get = (t, key, noContext) => {
  if (key in t) {
    const result = t[key]
    if (!noContext && result && result.inherits && key !== 'val') {
      if (t._c) {
        result._c = t._c
        result._cLevel = t._cLevel + 1
      } else if (result._c) {
        result._c = null
        result._cLevel = null
      }
    }
    return result
  } else if (t.inherits) {
    const result = $1662971556_$2621634261_get(t.inherits, key, true)
    if (!noContext && result && result.inherits && key !== 'val') {
      result._c = t
      result._cLevel = 1
    }
    return result
  }
}

const $1662971556_$2621634261_getOrigin = (t, key, noContext) => {
  if (t) {
    let result = $1662971556_$2621634261_get(t, key, noContext)
    if (result !== void 0 && result !== null) {
      return result
    } else {
      if ((t = t.val) && typeof t === 'object') {
        return t.inherits && $1662971556_$2621634261_getOrigin(t, key, noContext)
      }
    }
  }
}

const $1662971556_$2621634261_getProps = t => t.props || $1662971556_$2621634261_getProps(t.inherits)

// if you removed it dont return...
const $1662971556_$2621634261_getData = t => t.emitters && t.emitters.data || t.inherits && $1662971556_$2621634261_getData(t.inherits)

// same here
const $1662971556_$2621634261_getFn = t => t.fn || t.inherits && $1662971556_$2621634261_getFn(t.inherits)

const $1662971556_$2621634261_getDefault = t => t.props && t.props.default.struct || $1662971556_$2621634261_getDefault(t.inherits)

const $1662971556_$2621634261_getVal = t => t.val !== void 0 ? t.val : t.inherits && $1662971556_$2621634261_getVal(t.inherits)



var $1662971556_$2621634261_$ALL$ = {
  get: $1662971556_$2621634261_get,
  getDefault: $1662971556_$2621634261_getDefault,
  getOrigin: $1662971556_$2621634261_getOrigin,
  getData: $1662971556_$2621634261_getData,
  getFn: $1662971556_$2621634261_getFn,
  getVal: $1662971556_$2621634261_getVal,
  getProps: $1662971556_$2621634261_getProps
}
;const $1662971556_$466859286_removeKey = (t, key) => {
  if (t._ks) {
    const keys = t._ks
    let i = keys.length
    while (i--) {
      if (keys[i] === key) {
        keys.splice(i, 1)
        break
      }
    }
  }
}

const $1662971556_$466859286_removeContextKey = (t, key) => {
  if (!t._ks) {
    const keys = $1662971556_$466859286_getKeys(t.inherits)
    if (keys) {
      const b = []
      for (let i = 0, j = 0, len = keys.length; i < len; i++) {
        if (keys[i] === key) {
          j = 1
        } else {
          b[i - j] = keys[i]
        }
      }
      t._ks = b
    }
  } else {
    $1662971556_$466859286_removeKey(t, key)
  }
}

const $1662971556_$466859286_copy = t => {
  const keys = $1662971556_$466859286_getKeys(t.inherits)
  if (keys) {
    const len = keys.length
    let i = len
    const b = t._ks = []
    while (i--) { b[i] = keys[i] }
    return len
  }
}

const $1662971556_$466859286_addKey = (t, key) => {
  if (!t._ks) {
    const keys = $1662971556_$466859286_getKeys(t.inherits)
    if (keys) {
      const len = keys.length
      let i = len
      const b = t._ks = []
      while (i--) { b[i] = keys[i] }
      b[len] = key
    } else {
      t._ks = [ key ]
    }
  } else {
    t._ks.push(key)
  }
}

const $1662971556_$466859286_getKeys = t => t._ks || t.inherits && $1662971556_$466859286_getKeys(t.inherits)



var $1662971556_$466859286_$ALL$ = {
  removeKey: $1662971556_$466859286_removeKey,
  addKey: $1662971556_$466859286_addKey,
  removeContextKey: $1662971556_$466859286_removeContextKey,
  getKeys: $1662971556_$466859286_getKeys,
  copy: $1662971556_$466859286_copy
}
;var $1662971556_$826337949 = $826337949
;

const $1662971556_$3988518475_handleStruct = (p, stamp) => {
  if (p.emitters && p.emitters.data && p.emitters.data.struct && p.__tStamp !== stamp) {
    p.__tStamp = stamp
    let i = p.emitters.data.struct.length
    while (i--) {
      $1662971556_$3988518475_subscription(p.emitters.data.struct[i], stamp)
      $1662971556_$3988518475_handleStruct(p.emitters.data.struct[i])
    }
    p.__tStamp = null
  }
}

const $1662971556_$3988518475_subscription = (t, stamp, val) => {
  t.tStamp = stamp
  if (t._p || t._c) {
    let p = t._p
    if (t._c && t._cLevel === 1) p = t._c

    while (p && (!p.tStamp || p.tStamp !== stamp)) {
      p.tStamp = stamp
      $1662971556_$3988518475_handleStruct(p, stamp)

      if (p.subscriptions) $1662971556_$3988518475_exec(p)
      p = p._p
    }
  }
  if (t.subscriptions) $1662971556_$3988518475_exec(t)
}

const $1662971556_$3988518475_exec = t => {
  if (!t._inProgressS) {
    t._inProgressS = true
    $1662971556_$826337949.on(() => {
      let i = t.subscriptions.length
      while (i--) { t.subscriptions[i]() }
      t._inProgressS = false
    })
  }
}

var $1662971556_$3988518475 = $1662971556_$3988518475_subscription

;



const $1662971556_$2147961271_strip = t => {
  while (t && t._c) {
    t._c = null
    t._cLevel = null
    t = t._p
  }
}

const $1662971556_$2147961271_update = (context, t, val, stamp, key, resolve, level, j, fn) => {
  if (!(key in context)) {
    let n = j
    if (n) $1662971556_$2147961271_strip(context) // dont trust this, also heavy
    resolve._c = context
    resolve._cLevel = level
    $1662971556_$3988518475(context, stamp)
    while (n--) { fn[n](val, stamp, t) }
    if (context._p) {
      if ($1662971556_$2147961271_exec(t, val, stamp, context._p, context.key, context, 1, j, fn)) {
        context._c = null
        context._cLevel = null
      }
    }
    if (context.instances) {
      let i = context.instances.length
      while (i--) {
        $1662971556_$2147961271_update(context.instances[i], t, val, stamp, key, resolve, level, j, fn)
      }
    }
    return true
  }
}

const $1662971556_$2147961271_exec = (t, val, stamp, parent, key, resolve, level, j, fn) => {
  var clear
  if (parent.instances) {
    let i = parent.instances.length
    while (i--) {
      if ($1662971556_$2147961271_update(parent.instances[i], t, val, stamp, key, resolve, level, j, fn)) {
        clear = true
      }
    }
  }
  if (parent._p) {
    if ($1662971556_$2147961271_exec(t, val, stamp, parent._p, parent.key, resolve, level + 1, j, fn)) {
      clear = true
    }
  }
  return clear
}

// removal
const $1662971556_$2147961271_remove = (t, stamp) => {
  const data = $1662971556_$2621634261_getData(t)
  if (data) {
    const fn = $1662971556_$2621634261_getFn(data)
    if (fn) {
      let i = fn.length
      while (i--) { fn[i](null, stamp, t) }
    }
  }
  const keys = $1662971556_$466859286_getKeys(t)
  if (keys) {
    for (let i = 0, len = keys.length; i < len; i++) {
      let nest = $1662971556_$2621634261_get(t, keys[i])
      if (nest) {
        $1662971556_$2147961271_remove(nest, stamp)
        nest._c = null
        nest._cLevel = null
      }
    }
  }
}

const $1662971556_$2147961271_updateRemove = (context, t, stamp, key, resolve, level) => {
  if (!(key in context)) {
    resolve._c = context
    resolve._cLevel = level
    $1662971556_$3988518475(context, stamp)
    $1662971556_$2147961271_remove(t, stamp)
    if (context._p) {
      if ($1662971556_$2147961271_execRemove(t, stamp, context._p, context.key, context, 1)) {
        context._c = null
        context._cLevel = null
      }
    }
    if (context.instances) {
      let i = context.instances.length
      while (i--) {
        $1662971556_$2147961271_updateRemove(context.instances[i], t, stamp, key, resolve, level)
      }
    }
    return true
  }
}

const $1662971556_$2147961271_execRemove = (t, stamp, context, key, resolve, level) => {
  var clear
  if (context.instances) {
    let i = context.instances.length
    while (i--) {
      if ($1662971556_$2147961271_updateRemove(context.instances[i], t, stamp, key, resolve, level)) {
        clear = true
      }
    }
  }
  if (context._p) {
    if ($1662971556_$2147961271_execRemove(t, stamp, context._p, context.key, resolve, level + 1)) {
      clear = true
    }
  }
  return clear
}

const $1662971556_$2147961271_removeContext = (context, key, stamp) => {
  const t = $1662971556_$2621634261_get(context, key)
  if (t) {
    if (stamp) $1662971556_$2147961271_updateRemove(context, t, stamp, key, t, 1)
    t._c = null
    t._cLevel = null
  }
}



var $1662971556_$2147961271_$ALL$ = {
  removeContext: $1662971556_$2147961271_removeContext,
  exec: $1662971556_$2147961271_exec
}
;



const $1662971556_$2092109398_onGeneric = (t, key) => t.emitters && t.emitters[key] ||
  t.inherits && $1662971556_$2092109398_onGeneric(t.inherits, key)

const $1662971556_$2092109398_overrideSubscription = (t, override, stamp, isNew) => {
  t.stamp = override
  $1662971556_$3988518475(t, stamp)
  if (t._p && !isNew) {
    if ($1662971556_$2147961271_exec(t, void 0, stamp, t._p, t.key, t, 1, 0)) {
      t._c = null
      t._cLevel = null
    }
  }
}

const $1662971556_$2092109398_fn = (t, val, stamp, emitter, noContext) => {
  const listeners = $1662971556_$2621634261_getFn(emitter)
  if (listeners) {
    let i = listeners.length
    if (i && t._p && !noContext) {
      if ($1662971556_$2147961271_exec(t, val, stamp, t._p, t.key, t, 1, i, listeners)) {
        let clear = t
        while (clear && clear._c) {
          clear._c = null
          clear._cLevel = null
          clear = clear._p
        }
      }
    }
    while (i--) { listeners[i](val, stamp, t) }
  } else {
    emitter.listeners = []
  }
}

const $1662971556_$2092109398_data = (t, val, stamp, override, isNew) => {
  if (!t.stamp || t.stamp !== stamp) {
    t.stamp = override || stamp
    $1662971556_$3988518475(t, stamp)
    const own = t.emitters && t.emitters.data
    if (own) {
      const struct = own.struct
      $1662971556_$2092109398_fn(t, val, stamp, own)
      if (struct) {
        let i = struct.length
        while (i--) { $1662971556_$2092109398_updateStruct(struct[i], val, stamp, override) }
      }
    } else {
      const emitter = $1662971556_$2621634261_getData(t.inherits)
      if (emitter) {
        $1662971556_$2092109398_fn(t, val, stamp, emitter)
      } else {
        if (t._p && !isNew) {
          if ($1662971556_$2147961271_exec(t, val, stamp, t._p, t.key, t, 1, 0)) {
            t._c = null
            t._cLevel = null
          }
        }
      }
    }
  }
}

const $1662971556_$2092109398_updateStruct = (t, val, stamp, override) => {
  $1662971556_$2092109398_data(t, val, stamp, override)
  if (t.instances) {
    let i = t.instances.length
    while (i--) {
      if (t.instances[i].val === void 0) {
        $1662971556_$2092109398_updateStruct(t.instances[i], val, stamp, override)
      }
    }
  }
}

const $1662971556_$2092109398_generic = (t, type, val, stamp) => {
  if (type === 'data') {
    $1662971556_$2092109398_data(t, val, stamp)
  } else {
    const emitter = $1662971556_$2092109398_onGeneric(t, type)
    if (emitter) { $1662971556_$2092109398_fn(t, val, stamp, emitter, true) }
  }
}



var $1662971556_$2092109398_$ALL$ = {
  data: $1662971556_$2092109398_data,
  generic: $1662971556_$2092109398_generic,
  overrideSubscription: $1662971556_$2092109398_overrideSubscription
}
;

const $1662971556_$1442998772_get = (t, key) => t[key] || t.inherits && $1662971556_$1442998772_get(t.inherits, key)

const $1662971556_$1442998772_listener = (t, val, key, stamp) => {
  if (key in t) {
    const result = t[key]
    if (result) {
      if (result !== val) {
        const isFn = typeof result === 'function'
        $1662971556_$1442998772_replace(isFn ? t.fn : t.struct, result, val)
        if (val === null) {
          t[key] = null
        } else {
          t[key] = val
        }
      }
    } else if (val !== null) {
      $1662971556_$1442998772_add(t, val, key)
    }
  } else {
    const result = $1662971556_$1442998772_get(t.inherits, key)
    if (result && typeof result === 'function') {
      if (result !== val) {
        if (t.fn) {
          $1662971556_$1442998772_replace(t.fn, result, val)
        } else {
          t.fn = $1662971556_$1442998772_copyContext($1662971556_$2621634261_getFn(t), result, val)
        }
        t[key] = val
      }
    } else if (val !== null) {
      $1662971556_$1442998772_add(t, val, key)
    }
  }
}

const $1662971556_$1442998772_add = (t, val, key) => {
  if (typeof val === 'function') {
    $1662971556_$1442998772_addFn(t, val)
  } else {
    $1662971556_$1442998772_addStruct(t, val)
  }
  t[key] = val
}

const $1662971556_$1442998772_copyContext = (arr, val, replacement) => {
  const b = []
  if (!replacement) {
    for (let i = 0, j = 0, len = arr.length; i < len; i++) {
      if (arr[i] === val) {
        j = 1
      } else {
        b[i - j] = arr[i]
      }
    }
  } else {
    let i = arr.length
    while (i--) {
      if (arr[i] === val) {
        b[i] = replacement
      } else {
        b[i] = arr[i]
      }
    }
  }
  return b
}

const $1662971556_$1442998772_replace = (arr, val, replacement) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === val) {
      if (replacement) {
        arr.splice(i, 1, replacement)
      } else {
        arr.splice(i, 1)
      }
      break
    }
  }
}

const $1662971556_$1442998772_create = (arr, val) => {
  if (arr) {
    let i = arr.length
    const b = [ val ]
    while (i--) { b[i + 1] = arr[i] }
    return b
  } else {
    return [ val ]
  }
}

const $1662971556_$1442998772_addFn = (t, val) => {
  if (!t.fn) {
    t.fn = $1662971556_$1442998772_create($1662971556_$2621634261_getFn(t), val)
  } else {
    t.fn.unshift(val)
  }
}

const $1662971556_$1442998772_addStruct = (t, val) => {
  if (!t.struct) {
    t.struct = [ val ]
  } else {
    t.struct.unshift(val)
  }
}



var $1662971556_$1442998772_$ALL$ = {
  addFn: $1662971556_$1442998772_addFn,
  listener: $1662971556_$1442998772_listener,
  replace: $1662971556_$1442998772_replace
}
;var $1662971556_$2180032073 = $2180032073
;
var $1662971556_$3258224650_cnt = 1e4 // so now a limition becomes 10k fns normal
const $1662971556_$3258224650_uid = t => { return t._uid || (t._uid = ++$1662971556_$3258224650_cnt) }
const $1662971556_$3258224650_cuid = t => {
  if (t._c) {
    var id = 5381
    while (t) {
      id = id * 33 ^ $1662971556_$3258224650_uid(t)
      t = t._cLevel === 1 ? t._c : t._p
    }
    return id >>> 0
  } else {
    return $1662971556_$3258224650_uid(t) - 1e4
  }
}
const $1662971556_$3258224650_puid = t => {
  var id = 5381
  var p = t
  if (t._c) {
    while (p) {
      let key = p.key
      if (key !== void 0) {
        id = id * 33 ^ ($1662971556_$2180032073(key))
        p = p._cLevel === 1 ? p._c : p._p
      } else {
        return id >>> 0
      }
    }
    return id >>> 0
  } else if (t._puid) {
    return t._puid
  } else {
    while (p) {
      let key = p.key
      if (key !== void 0) {
        id = id * 33 ^ ($1662971556_$2180032073(key))
        p = p._p
      } else {
        return (t._puid = id >>> 0)
      }
    }
    return (t._puid = id >>> 0)
  }
}



var $1662971556_$3258224650_$ALL$ = {
  uid: $1662971556_$3258224650_uid,
  cuid: $1662971556_$3258224650_cuid,
  puid: $1662971556_$3258224650_puid
}
;




const $1662971556_$2633820941_resolveContext = (t, val, stamp, reset) => {
  let level = t._cLevel
  var cntx = t._c
  let key
  if (cntx._c) {
    cntx = $1662971556_$2633820941_resolveContext(cntx, void 0, stamp)
  }
  if (level > 1) {
    let path = []
    let parent = t._p
    while (--level) {
      path.unshift(parent.key)
      parent = parent._p
    }
    // need to happen for every step.. also when making an instance
    // basicly it allways needs to happen on create...
    key = path[0]
    let inherits = $1662971556_$2621634261_get(cntx, key, true)
    $1662971556_$2633820941_contextProperty(cntx, void 0, stamp, key, inherits)
    inherits._c = null
    inherits._cLevel = null
    cntx = cntx[key]
    for (let i = 1, len = path.length; i < len; i++) {
      key = path[i]
      inherits = $1662971556_$2621634261_get(cntx, key, true)
      cntx[key] = $1662971556_$4292174816_create(inherits, void 0, stamp, cntx, key)
      inherits._c = null
      inherits._cLevel = null
      cntx = cntx[key]
    }
    key = t.key
  } else {
    key = t.key
  }
  t._c = null
  t._cLevel = null
  return $1662971556_$2633820941_contextProperty(cntx, val, stamp, key, $1662971556_$2621634261_get(cntx, key, true), reset)
}

const $1662971556_$2633820941_contextProperty = (t, val, stamp, key, property, reset) => {
  if (val === null) {
    $1662971556_$2147961271_removeContext(t, key, stamp)
    t[key] = null
    $1662971556_$466859286_removeContextKey(t, key)
    return val
  } else {
    return $1662971556_$4292174816_create(property, val, stamp, t, key, reset)
  }
}

/**
 * @function storeContext
 * stores context for reapplying with applyContext
 * @todo: needs perf optmization
 * @return {array} returns store
 */
const $1662971556_$2633820941_storeContext = t => {
  var context = t._c
  if (context) {
    const arr = []
    let level = t._cLevel
    while (context) {
      arr.push(context, level)
      level = context._cLevel
      context = context._c
    }
    return arr
  }
}

/**
 * @function applyContext
 * applies context to base
 */
const $1662971556_$2633820941_applyContext = (t, store) => {
  if (store) {
    const l = store.length
    let ret
    for (let i = 0, target = t; i < l; i += 2) {
      let context = store[i]
      let level = store[i + 1]
      let path = [ target ]
      let newTarget = $1662971556_$2633820941_setContext(target, context, level, path)
      let struct = $1662971556_$2633820941_handleChange(target, context, path, level)
      if (ret === void 0 && struct !== void 0) {
        ret = struct
      }
      if (newTarget) target = newTarget
    }
    return ret
  } else {
    if (t._c) {
      t._c = null
      t._cLevel = null
    }
  }
}

const $1662971556_$2633820941_handleChange = (target, context, path, level) => {
  var newContext, newLevel
  var travelTaget = context
  if (context._p && context._p[context.key] === null) {
    return null
  }
  for (let i = 0, len = path.length; i < len; i++) {
    let segment = path[i]
    let field = $1662971556_$2621634261_get(travelTaget, segment.key)
    // delete does not work.... like this does not set null anymore
    if (!field || field.val === null) {
      $1662971556_$2633820941_removeContext(target, level)
      return null
    } else if (field !== segment) {
      segment._c = null
      segment._cLevel = null
      newContext = field
      newLevel = len - (i + 1)
    }
    travelTaget = field
    if (i === len - 1) target = travelTaget
  }
  if (newContext) {
    if (!newLevel) {
      $1662971556_$2633820941_removeContext(target, level)
    } else {
      $1662971556_$2633820941_setContext(target, newContext, newLevel)
    }
    return target
  }
}

const $1662971556_$2633820941_setContext = (target, context, level, path) => {
  if (level) {
    target._cLevel = level
    target._c = context
    if (level > 1) {
      let p = target._p
      for (let i = 1; p && i < level; i++) {
        if (path) { path.unshift(p) }
        p._c = context
        p._cLevel = target._cLevel - i
        p = p._p
      }
    }
    return context
  }
}

const $1662971556_$2633820941_removeContext = (target, level) => {
  if (level) {
    target._cLevel = null
    target._c = null
    if (level > 1) {
      let p = target._p
      for (let i = 1; p && i < level; i++) {
        p._c = null
        p._cLevel = null
        p = p._p
      }
    }
  }
}

// make some tests but obvisouly usefull
// const clearContext = (t, level) => {
//   var parent = t
//   var i = 0
//   if (!level) level = t._cLevel
//   while (parent && i < level) {
//     parent._c = null
//     parent._cLevel = null
//     parent = i === 1 ? parent._c : parent._p
//     i++
//   }
//   return this
// }



var $1662971556_$2633820941_$ALL$ = {
  contextProperty: $1662971556_$2633820941_contextProperty,
  resolveContext: $1662971556_$2633820941_resolveContext,
  applyContext: $1662971556_$2633820941_applyContext,
  storeContext: $1662971556_$2633820941_storeContext
}
;




// (t, val[key], key, stamp, isNew, val, reset)

const $1662971556_$624523381_property = (t, val, key, stamp, struct, isNew, reset) => {
  var changed
  const result = $1662971556_$2621634261_get(t, key)
  if (result && result.inherits) {
    if (result._c) {
      // also need to do some stuff here
      $1662971556_$2633820941_contextProperty(t, val, stamp, key, result, reset)
    } else {
      $1662971556_$4292174816_set(result, val, stamp, void 0, reset)
      changed = val === null
    }
  } else {
    changed = true
    $1662971556_$466859286_addKey(t, key)
    $1662971556_$4292174816_create(struct, val, stamp, t, key, reset)
  }
  return changed
}

const $1662971556_$624523381_getProp = (t, key) => t.props
  ? key && (key in t.props && t.props[key]) || t.props.default
  : $1662971556_$624523381_getProp(t.inherits, key)



var $1662971556_$624523381_$ALL$ = {
  getProp: $1662971556_$624523381_getProp,
  property: $1662971556_$624523381_property
}
;


var $1662971556_$3815974835 = (t, key, val, stamp, noContext) => {
  var bind
  // if typeof key === 'fn' // do somethign as well -- super nice extra

  if (typeof key === 'object') {
    if (val !== void 0) {
      for (let i = 0, len = key.length; t && i < len; i++) {
        bind = t
        t = $1662971556_$2621634261_getOrigin(t, key[i], noContext)
        if (!t) {
          let ret = $1662971556_$4292174816_set(bind, { [key[i]]: i === len - 1 ? val : {} }, stamp)
          if (ret && ret.inherits) { bind = ret }
          t = $1662971556_$2621634261_get(bind, key[i], noContext)
        }
        if (typeof t === 'function') { t = bind[key[i]]() }
      }
    } else {
      for (let i = 0, len = key.length; t && i < len; i++) {
        bind = t
        t = $1662971556_$2621634261_get(t, key[i], noContext) || $1662971556_$2621634261_getOrigin(t, key[i], noContext)
        if (typeof t === 'function' && $1662971556_$3815974835_whitelist(key[i])) { t = bind[key[i]]() }
      }
    }
    return t
  } else {
    bind = t
    t = $1662971556_$2621634261_getOrigin(t, key, noContext)
    if (!t && val !== void 0) {
      $1662971556_$4292174816_set(bind, { [key]: val }, stamp)
      t = $1662971556_$2621634261_get(bind, key, noContext)
    } else {
      if (typeof t === 'function' && $1662971556_$3815974835_whitelist(key)) { t = bind[key]() }
    }
    return t
  }
}

const $1662971556_$3815974835_whitelist = key =>
  key === 'root' ||
  key === 'parent' ||
  key === 'compute' ||
  key === 'origin'

;const $1662971556_$1695496138_parent = t => {
  if (t._c) {
    if (t._cLevel === 1) {
      return t._c
    } else {
      t._p._cLevel = t._cLevel - 1
      t._p._c = t._c
      return t._p
    }
  } else {
    return t._p
  }
}

const $1662971556_$1695496138_root = (t, real) => {
  var p = t
  if (real) {
    while (p) {
      t = p
      p = p._p
    }
  } else {
    while (p) {
      t = p
      p = $1662971556_$1695496138_parent(p)
    }
  }
  return t
}

// add option for resolve
const $1662971556_$1695496138_path = (t, real) => {
  const result = []
  var parent = t
  while (parent) {
    if (parent._c && !real) {
      let i = parent._cLevel
      let p = parent
      while (i--) {
        result.unshift(p.key)
        p = p._p
      }
      parent = parent._c
    } else if (parent.key) {
      result.unshift(parent.key)
      parent = parent._p
    } else {
      break
    }
  }
  return result
}



var $1662971556_$1695496138_$ALL$ = {
  path: $1662971556_$1695496138_path,
  parent: $1662971556_$1695496138_parent,
  root: $1662971556_$1695496138_root
}
;






const $1662971556_$2164199530_resolveReferences = (t, instance, stamp) => {
  const listeners = t.emitters.data.struct
  const tRoot = $1662971556_$1695496138_root(t, true)
  var iRoot
  let i = listeners.length
  while (i--) {
    if ($1662971556_$1695496138_root(listeners[i], true) === tRoot) {
      if (!iRoot) iRoot = $1662971556_$1695496138_root(instance, true)
      if (iRoot !== tRoot) {
        const p = $1662971556_$1695496138_path(listeners[i], true)
        if (p[0] === tRoot.key) p.shift()
        $1662971556_$4292174816_set($1662971556_$3815974835(iRoot, p, {}), instance, stamp, true)
      }
    }
  }
}

const $1662971556_$2164199530_removeReference = t => {
  if (t.val && typeof t.val === 'object' && t.val.inherits) {
    $1662971556_$1442998772_listener(t.val.emitters.data, null, $1662971556_$3258224650_uid(t))
  }
}

const $1662971556_$2164199530_reference = (t, val, stamp) => $1662971556_$4292174816_set(t, $1662971556_$3815974835(t, val.slice(1), {}, stamp))

const $1662971556_$2164199530_resolveFromValue = (t, val, stamp) => {
  if (val.instances && val._p && t._p) {
    const rootInstances = val.root(true).instances
    if (rootInstances && t.root(true) === val.root(true)) {
      for (let i = 0, len = rootInstances.length; i < len; i++) {
        const field = $1662971556_$3815974835(rootInstances[i], $1662971556_$1695496138_path(val, true), void 0, void 0, true)
        if (field !== val) {
          const instance = $1662971556_$3815974835(rootInstances[i], $1662971556_$1695496138_path(t, true))
          if (instance && $1662971556_$2621634261_getVal(instance) === val) {
            instance.set(field, stamp)
          }
          instance._c = null
          instance._cLevel = null
          field._c = null
          field._cLevel = null
        }
      }
    }
  }
}



var $1662971556_$2164199530_$ALL$ = {
  resolveReferences: $1662971556_$2164199530_resolveReferences,
  removeReference: $1662971556_$2164199530_removeReference,
  reference: $1662971556_$2164199530_reference,
  resolveFromValue: $1662971556_$2164199530_resolveFromValue
}
;


 // rdy for this


const $1662971556_$2264940719_getKeyProp = (t, key) => t.props
  ? key && (key in t.props && t.props[key])
  : $1662971556_$2264940719_getKeyProp(t.inherits, key)

const $1662971556_$2264940719_props = (t, inherits) => {
  if (t.props) {
    let own
    for (let key in t.props) {
      const prop = $1662971556_$624523381_getProp(inherits, key)
      if (!prop || t.props[key].struct != prop.struct) { // eslint-disable-line
        if (!own) own = {}
        own[key] = t.props[key]
      }
    }
    return own
  }
}

const $1662971556_$2264940719_switchInheritance = (t, inherits, stamp, fromInstance) => {
  var inheritsKeys, keys
  const old = t.inherits
  if (!old) return
  const instances = old.instances
  const tProps = $1662971556_$2264940719_props(t, old)
  t.inherits = inherits

  if (tProps) {
    const previous = $1662971556_$2621634261_getProps(inherits)
    const props = t.props = {}

    for (let key in previous) {
      props[key] = previous[key]
    }
    for (let key in tProps) {
      if (tProps[key].struct) {
        $1662971556_$2264940719_switchInheritance(tProps[key].struct, (
          (tProps.default ? $1662971556_$2264940719_getKeyProp(t, key) : tProps.default) || $1662971556_$624523381_getProp(t, key)
        ).struct)
        props[key] = tProps[key]
      }
    }
  }

  if (t._ks && (inheritsKeys = $1662971556_$466859286_getKeys(inherits))) {
    if (!keys) keys = []
    for (let i = 0, len = inheritsKeys.length; i < len; i++) {
      const key = inheritsKeys[i]
      if (!(key in t)) keys.push(key)
    }
    for (let i = 0, len = t._ks.length; i < len; i++) {
      const key = t._ks[i]
      if (key in t) {
        keys.push(key)
        const prop = $1662971556_$624523381_getProp(t, key)
        if (prop.struct) {
          $1662971556_$2264940719_switchInheritance(t[key], $1662971556_$2621634261_get(inherits, key, true) || prop.struct, stamp)
        }
        // '  PROPS ON NEW INHERITANCE IS NOT A STRUCT -- switching inheritance - not supported yet', key)
      }
    }
    t._ks = keys
  }

  if (inherits !== old) {
    if (instances) {
      let i = instances.length
      while (i--) {
        if (instances[i] === t) {
          instances.splice(i, 1)
          break
        }
      }
    }
    if (inherits.instances !== false) {
      if (!inherits.instances) inherits.instances = []
      inherits.instances.push(t)
    }
  }

  const inheritsEmitters = $1662971556_$2621634261_get(inherits, 'emitters', true)

  if (t.emitters) {
    const keys = $1662971556_$466859286_getKeys(t.emitters)
    if (keys) {
      for (let i = 0, len = keys.length; i < len; i++) {
        $1662971556_$2264940719_handleEmitters(t, t.emitters, inheritsEmitters, keys[i])
      }
    }
  }

  if (t.instances) {
    for (let i = 0, len = t.instances.length; i < len; i++) {
      $1662971556_$2264940719_switchInheritance(t.instances[i], t, stamp, true)
    }
  }

  const val = $1662971556_$2621634261_getVal(t)
  if (typeof val === 'object' && val.inherits) {
    $1662971556_$2164199530_resolveFromValue(inherits, val, stamp)
  }

  if (stamp && !fromInstance) $1662971556_$2092109398_data(t, void 0, stamp, false)
}

// ok so need to make a nice list of shit with keys make a new object
const $1662971556_$2264940719_inheritedEmitter = (emitter, result = {}) => {
  $1662971556_$2264940719_eachListener(emitter, (listener, key) => {
    if (typeof listener === 'function' && !(key in result)) {
      result[key] = listener
    }
  })
  if (emitter.inherits) $1662971556_$2264940719_inheritedEmitter(emitter.inherits, result)
  return result
}

const $1662971556_$2264940719_eachListener = (emitter, fn) => {
  for (let key in emitter) {
    if (
      key !== '_p' &&
      key !== 'key' &&
      key !== 'fn' &&
      key !== '_c' &&
      key !== '_cLevel' &&
      key !== 'instances' &&
      key !== 'inherits'
    ) {
      fn(emitter[key], key)
    }
  }
}

const $1662971556_$2264940719_handleEmitters = (t, emitters, inherits, key) => {
  const emitter = emitters[key]
  const inheritsEmitter = inherits && $1662971556_$2621634261_get(inherits, key, true)
  const fn = emitter.fn
  const newFn = []

  $1662971556_$2264940719_eachListener(emitter, (listener, key) => {
    if (typeof listener === 'function') newFn.push(listener)
  })

  if (fn) {
    const inheritsFn = inheritsEmitter && $1662971556_$2621634261_getFn(inheritsEmitter)
    if (inheritsFn) {
      const result = $1662971556_$2264940719_inheritedEmitter(inheritsEmitter)
      for (let key in result) {
        if (!(key in emitter)) {
          newFn.push(result[key])
        }
      }
    }
  }

  emitter.fn = newFn
}



var $1662971556_$2264940719_$ALL$ = {
  switchInheritance: $1662971556_$2264940719_switchInheritance
}
;



const $1662971556_$1506544200_update = (t, val, key, resolved, from) => {
  if (!(key in t)) {
    if (key !== 'val') {
      if (val[key] !== null) {
        if (!resolved) {
          if (t._ks) {
            $1662971556_$466859286_addKey(t, key)
          } else {
            $1662971556_$466859286_copy(t)
            return 1
          }
        }
      }
    }
    return true
  } else {
    if (val[key] === null && t[key]) {
      // do removal better
      if (!t._ks) {
        $1662971556_$466859286_copy(t)
        $1662971556_$466859286_addKey(t, key)
        return 1
      } else {
        $1662971556_$466859286_addKey(t, key) // no update
      }
    } else if (t[key] && from[key]) {
      $1662971556_$2264940719_switchInheritance(t[key], from[key])
    }
  }
}

const $1662971556_$1506544200_propertyKeys = (t, val, stamp, changed, resolved, override, from) => {
  var j = changed.length
  var inherits
  if (t.instances) {
    while (j--) {
      let key = changed[j]
      let res = $1662971556_$1506544200_update(t, val, key, resolved, from)
      if (res) {
        if (res !== true) { resolved = res }
        if (!inherits) {
          inherits = [ key ]
        } else {
          inherits.push(key)
        }
      }
    }
    if (inherits) {
      if (stamp) { $1662971556_$2092109398_data(t, val, stamp, override) }
      $1662971556_$1506544200_propertyChange(t, val, stamp, inherits, resolved, override)
    }
  } else {
    while (j--) {
      inherits = $1662971556_$1506544200_update(t, val, changed[j], resolved, from)
      if (inherits === 1) { resolved = inherits }
    }
    if (inherits && stamp) {
      $1662971556_$2092109398_data(t, val, stamp, override)
    }
  }
}

const $1662971556_$1506544200_propertyChange = (t, val, stamp, changed, resolved, override, from) => {
  const instances = t.instances
  let i = instances.length
  while (i--) {
    let instance = instances[i]
    $1662971556_$1506544200_propertyKeys(instance, val, stamp, changed, resolved, override, from)
  }
}

const $1662971556_$1506544200_valChange = (t, val, stamp, changed, override) => {
  const instances = t.instances
  let i = instances.length
  while (i--) {
    let instance = instances[i]
    if (instance.val === void 0) {
      if (stamp) { $1662971556_$2092109398_data(instance, val, stamp, override) }
      if (instance.instances) { $1662971556_$1506544200_valChange(instance, val, stamp, changed, override) }
    }
  }
}

const $1662971556_$1506544200_instances = (t, val, stamp, changed, override) => {
  if (changed === true) {
    $1662971556_$1506544200_valChange(t, val, stamp, changed, override)
  } else {
    $1662971556_$1506544200_propertyChange(t, val, stamp, changed, void 0, override, t)
  }
}

var $1662971556_$1506544200 = $1662971556_$1506544200_instances

;





const $1662971556_$2839414644_remove = (t, stamp, override, instance, from) => {
  if (!t) {
    console.log('no t how?')
    return
  }
  if (t._async) { delete t._async }

  if (t.val && typeof t.val === 'object' && t.val.inherits) {
    $1662971556_$1442998772_listener(t.val.emitters.data, null, $1662971556_$3258224650_uid(t))
  }

  if (!instance && t.inherits.instances) {
    const instances = t.inherits.instances
    const len = instances.length
    let i = len
    while (i--) {
      if (instances[i] === t) {
        instances.splice(i, 1)
        break
      }
    }
  }

  if (t.emitters && t.emitters.data && t.emitters.data.struct) {
    let s = t.emitters.data.struct.length
    while (s--) {
      let struct = t.emitters.data.struct[s]
      if (struct.val === t) struct.val = null
    }
  }

  if (!instance) {
    if (stamp) {
      $1662971556_$2092109398_data(t, null, stamp, override)
    }
    if (t._ks) {
      const keys = t._ks
      for (let i = 0, len = keys.length; i < len; i++) {
        if (keys[i] in t) {
          $1662971556_$2839414644_remove(t[keys[i]], stamp, override, false, true)
          i--
          len--
        } else {
          $1662971556_$2147961271_removeContext(t, keys[i], stamp)
        }
      }
    } else {
      const keys = $1662971556_$466859286_getKeys(t)
      if (keys) {
        for (let i = 0, len = keys.length; i < len; i++) {
          $1662971556_$2147961271_removeContext(t, keys[i], stamp)
        }
      }
    }
  } else {
    if (stamp) { $1662971556_$2092109398_data(t, null, stamp, override) }
    if (t._ks) {
      const keys = t._ks
      for (let i = 0, len = keys.length; i < len; i++) {
        if (keys[i] in t) {
          $1662971556_$2839414644_remove(t[keys[i]], stamp, override, false, true)
          i--
          len--
        }
      }
    }
  }

  const instances = t.instances
  if (instances) {
    let i = instances.length
    while (i--) { $1662971556_$2839414644_remove(instances[i], stamp, override, true) }
    t.instances = null
  }

  $1662971556_$2839414644_removeFromParent(t._p, t.key, stamp, override, false, from)

  return true
}

const $1662971556_$2839414644_removeFromParent = (parent, key, stamp, override, instance, from) => {
  if (parent && key) {
    if (!instance || parent._ks) {
      $1662971556_$466859286_removeKey(parent, key)
      if (instance) {
        if (key in parent) { delete parent[key] }
      } else {
        parent[key] = null
      }
    }
    if (!from && stamp) {
      $1662971556_$2092109398_data(parent, { [key]: null }, stamp, override)
    }
    const instances = parent.instances
    if (instances) {
      let i = instances.length
      while (i--) {
        $1662971556_$2839414644_removeFromParent(instances[i], key, stamp, override, true)
      }
    }
  }
}

var $1662971556_$2839414644 = $1662971556_$2839414644_remove

;




const $1662971556_$2411079736_getType = (parent, type, t, stamp) => {
  if (typeof type === 'object') {
    if (type.inherits) {
      return type
    } else if (type.val && type.stamp !== void 0) {
      type = type.val
    } else {
      if (!type._created) {
        type._created = $1662971556_$4292174816_create($1662971556_$624523381_getProp(t).struct, type, stamp, parent)
      }
      return type._created
    }
  }
  let result = $1662971556_$2411079736_getTypeInternal(parent, type, t)
  if (!result) {
    // create type
    // console.log('no result - create type', type)
    parent = $1662971556_$1695496138_root(parent)
    $1662971556_$4292174816_set(parent, { types: { [type]: {} } }, stamp)
    result = parent.types[type]
  }
  return result
}

// setTimeout(() => {
//   console.log(cnt, obj)
// }, 1e3)

const $1662971556_$2411079736_getTypeInternal = (parent, type, t) =>
  (!t || typeof type === 'string' || typeof type === 'number') &&
  (
    parent.types && $1662971556_$2621634261_get(parent.types, type) ||
    parent.inherits && $1662971556_$2411079736_getTypeInternal(parent.inherits, type) ||
    parent._p && $1662971556_$2411079736_getTypeInternal(parent._p, type)
  )

var $1662971556_$2411079736 = $1662971556_$2411079736_getType

;


// create set obj can go away

// need to add listeners??? -- this is a rly strange case...

// has to happen when you create an instance of soemthing and change the type... rly weird
const $1662971556_$3658148266_createSetObj = (t, top) => {
  const result = {}
  const keys = t._ks
  if (t.type && !top) result.type = t.type.compute()
  if (keys) {
    for (let i = 0, len = keys.length; i < len; i++) {
      let key = keys[i]
      let field = t[key]
      if (field) result[key] = $1662971556_$3658148266_createSetObj(field, false)
    }
  }
  if (t.val !== void 0) result.val = t.val
  return result
}

var $1662971556_$3658148266_obj = {}

const $1662971556_$3658148266_createType = (parent, val, t, stamp, key) => {
  const type = val.type
  const constructor = $1662971556_$2411079736(parent, type, t, stamp) || t

  if (typeof val.type === 'object' && !val.type.stamp) {
    delete val.type
  }
  const instance = new constructor.Constructor()
  instance.inherits = constructor
  // console.log('count')
  // if (typeof type === 'object') {
  //   // console.log('--->', type)
  // }
  $1662971556_$3658148266_obj[type] = $1662971556_$3658148266_obj[type] ? $1662971556_$3658148266_obj[type] + 1 : 1
  if (constructor.instances !== false) {
    if (!constructor.instances) {
      constructor.instances = [ instance ]
    } else {
      constructor.instances.push(instance)
    }
  }

  //   if (constructor !== t && key && t.key === key && !val.reset && (t._ks || t.val !== void 0)) {

  if (constructor !== t && key && t.key === key && (t._ks || t.val !== void 0)) {
    // this has to become stronger / better
    // also need to call merge in the update path from original
    // need to handle types better -- from original to context and vice-versa
    $1662971556_$4292174816_set(instance, $1662971556_$3658148266_createSetObj(t, true, instance), stamp)
  }
  return instance
}

var $1662971556_$3658148266 = $1662971556_$3658148266_createType

;




var $1662971556_$2380202644_uid = 0
const $1662971556_$2380202644_extendSet = (t, val, stamp, context) => {
  if (t._c) {
    t._c = null
    t._cLevel = null
  }
  if (stamp) {
    $1662971556_$4292174816_set(t, val, $1662971556_$826337949.create())
    $1662971556_$826337949.close()
  } else {
    $1662971556_$4292174816_set(t, val)
  }
}

const $1662971556_$2380202644_error = (t, err, stamp) => {
  if (err) {
    $1662971556_$826337949.inProgress = false
    $1662971556_$2092109398_generic($1662971556_$1695496138_root(t), 'error', err, stamp)
  }
}

const $1662971556_$2380202644_isGeneratorFunction = obj => {
  const constructor = obj.constructor
  return constructor && (constructor.name === 'GeneratorFunction' ||
    constructor.displayName === 'GeneratorFunction') ||
    typeof constructor.prototype.next === 'function'
}

const $1662971556_$2380202644_generator = (t, val, stamp) => $1662971556_$2380202644_iterator(t, val(t, stamp), stamp)

const $1662971556_$2380202644_promiseQueue = (t, uid, val, error) => {
  if (t.async) {
    for (let i = 0, end = t.async.length - 2; i < end; i += 3) {
      if (t.async[i + 2] === uid) {
        t.async[i] = val
        t.async[i + 2] = void 0
        if (i === 0) { $1662971556_$2380202644_execPromise(t) }
        break
      }
    }
  }
}

const $1662971556_$2380202644_done = t => {
  t.async.splice(0, 3)
  if (t.async.length) { $1662971556_$2380202644_queue(t) }
  if (t.async && !t.async.length) {
    delete t.async
  }
}

const $1662971556_$2380202644_queue = t => {
  const async = t.async[0]
  if (async && async.next) {
    $1662971556_$2380202644_execIterator(t, async, t.async[1], t.async[2], $1662971556_$2380202644_done)
  } else if (!t.async[2]) {
    $1662971556_$2380202644_execPromise(t)
  }
}

const $1662971556_$2380202644_execPromise = t => {
  const async = t.async[0]
  if (async !== void 0) {
    if (Array.isArray(async)) {
      for (let i = 0, len = async.length; i < len; i++) {
        $1662971556_$2380202644_extendSet(t, async[i], t.async[1])
      }
    } else {
      $1662971556_$2380202644_extendSet(t, async, t.async[1])
    }
  }
  $1662971556_$2380202644_done(t)
}

const $1662971556_$2380202644_next = (iteratee, t, stamp, val) => {
  try {
    return iteratee.next()
  } catch (err) {
    $1662971556_$2380202644_error(t, err, stamp)
    $1662971556_$2380202644_done(t)
  }
}

const $1662971556_$2380202644_execIterator = (t, iteratee, stamp, id, done, val) => {
  if (t.async && t.async[2] === id) {
    if (!val || !val.done) {
      if (val !== void 0) {
        if (
          val.value &&
          typeof val.value === 'object' &&
          typeof val.value.then === 'function'
        ) {
          val.value
          .then(resolved => {
            if (t.async && t.async[2] === id) {
              $1662971556_$2380202644_extendSet(t, resolved, stamp)
              $1662971556_$2380202644_execIterator(t, iteratee, stamp, id, done, $1662971556_$2380202644_next(iteratee, t, stamp))
            }
          })
          .catch(err => {
            if (t.async && t.async[2] === id) {
              $1662971556_$2380202644_error(t, err, stamp)
              $1662971556_$2380202644_execIterator(t, iteratee, stamp, id, done, $1662971556_$2380202644_next(iteratee, t, stamp))
            }
          })
        } else {
          $1662971556_$2380202644_extendSet(t, val.value, stamp)
          $1662971556_$2380202644_execIterator(t, iteratee, stamp, id, done, $1662971556_$2380202644_next(iteratee, t, stamp))
        }
      } else {
        $1662971556_$2380202644_execIterator(t, iteratee, stamp, id, done, $1662971556_$2380202644_next(iteratee, t, stamp))
      }
    } else if (val.done) {
      done(t)
    }
  }
}

const $1662971556_$2380202644_iterator = (t, iteratee, stamp, val) => {
  const id = ++$1662971556_$2380202644_uid
  if (!t.async) {
    t.async = [ iteratee, stamp, id ]
    // time out is a temp solution
    // should work with bs.on ofcourse....
    // bs.on(() => {
    //   queue(t)
    // })
    setTimeout(() => $1662971556_$2380202644_queue(t))
  } else {
    t.async.push(iteratee, stamp, id)
  }
}

const $1662971556_$2380202644_promise = (t, promise, stamp) => {
  const id = ++$1662971556_$2380202644_uid
  if (!t.async) {
    t.async = [ void 0, stamp, id ]
    $1662971556_$2380202644_queue(t)
  } else {
    t.async.push(void 0, stamp, id)
  }
  promise
    .then(val => $1662971556_$2380202644_promiseQueue(t, id, val))
    .catch(err => {
      $1662971556_$2380202644_error(t, err, stamp)
      $1662971556_$2380202644_promiseQueue(t, id, void 0, err)
    })
}



var $1662971556_$2380202644_$ALL$ = {
  isGeneratorFunction: $1662971556_$2380202644_isGeneratorFunction,
  promise: $1662971556_$2380202644_promise,
  generator: $1662971556_$2380202644_generator,
  iterator: $1662971556_$2380202644_iterator
}
;











const $1662971556_$4292174816_create = (t, val, stamp, parent, key, reset) => {
  var instance
  const hasType = val &&
    typeof val === 'object' &&
    val.type && $1662971556_$624523381_getProp(t, 'type') !== $1662971556_$624523381_getProp(t, 'default')
  if (parent) {
    if (hasType) {
      instance = $1662971556_$3658148266(parent, val, t, stamp, key)
    } else {
      instance = new t.Constructor()
      instance.inherits = t
      if (t.instances !== false) {
        if (!t.instances) {
          t.instances = [ instance ]
        } else {
          t.instances.push(instance)
        }
      }
    }
    instance._p = parent
    if (key !== void 0) {
      instance.key = key
      parent[key] = instance
    }
  } else {
    if (hasType && typeof val.type === 'object') {
      instance = $1662971556_$3658148266(parent, val, t, stamp, key)
    } else {
      instance = new t.Constructor()
      instance.inherits = t
      if (t.instances !== false) {
        if (!t.instances) {
          t.instances = [ instance ]
        } else {
          t.instances.push(instance)
        }
      }
    }
  }
  if (val !== void 0) {
    $1662971556_$4292174816_set(instance, val, stamp, true, reset)
  }

  if (parent) {
    if (
      t.emitters &&
      t.emitters.data &&
      t.emitters.data.struct
    ) {
      $1662971556_$2164199530_resolveReferences(t, instance, stamp)
    }
  }
  return instance
}

// rename this
const $1662971556_$4292174816_removeAllFields = (t, stamp) => {
  const keys = $1662971556_$466859286_getKeys(t)
  let changed
  if (keys) {
    let i = keys.length
    while (i--) {
      if (keys[i] in t) {
        $1662971556_$2839414644(t[keys[i]], stamp)
        changed = true
      }
    }
  }
  return changed
}

const $1662971556_$4292174816_removeSomeFields = (t, stamp, val, changed, isBool) => {
  const keys = $1662971556_$466859286_getKeys(t)
  if (!val.val && t.val !== void 0) {
    val.val = void 0
    if (isBool) {
      changed = true
    } else if (!changed) {
      changed = []
    }
  }
  if (keys) {
    let i = keys.length
    while (i--) {
      const key = keys[i]
      if (!(key in val) && (key in t)) {
        $1662971556_$2839414644(t[key], stamp)
        if (isBool) {
          changed = true
        } else {
          if (!changed) {
            changed = [ key ]
          } else {
            changed.push(key)
          }
        }
      }
    }
  }
  return changed
}

const $1662971556_$4292174816_overrideObjects = (t, val, stamp, isNew, reset) => {
  var override = val.stamp

  if (override && t.stamp) {
    if (t.stamp > override) {
      // console.log('HERE', t.root()._uid_, t.stamp, '>', override)
      // console.log('diff:', (t.stamp | 0) - (override | 0))
      return false
    }
  }

  if (!stamp) stamp = override // also need to use this for _t stmap but not for travel :/

  if (val.val === null) {
    return $1662971556_$2839414644(t, stamp, override)
  } else {
    if (t.instances) {
      let changed
      for (let key in val) {
        if (key !== 'stamp') {
          let result = key !== 'val'
              ? $1662971556_$624523381_getProp(t, key)(t, val[key], key, stamp, isNew, reset, val)
              : $1662971556_$4292174816_setVal(t, val.val, stamp, 1)
          if (result) {
            if (!changed) {
              changed = result === 2 ? [] : [ key ]
            } else if (result !== 2) {
              changed.push(key)
            }
          }
        }
      }

      if (reset) {
        const changeNest = $1662971556_$4292174816_removeSomeFields(t, stamp, val, changed)
        if (!changed) changed = changeNest
      }

      if (changed) {
        if (stamp) { $1662971556_$2092109398_data(t, val, stamp, override, isNew) }
        $1662971556_$1506544200(t, val, stamp, changed, override)
        return true
      } else if (stamp !== t.tStamp) {
        // need to apply tStamp from override but not for the travel parts
        $1662971556_$2092109398_overrideSubscription(t, override, stamp, isNew)
      }
    } else {
      let changed
      for (let key in val) {
        if (key !== 'stamp') {
          if (
            key !== 'val'
              ? $1662971556_$624523381_getProp(t, key)(t, val[key], key, stamp, isNew, reset, val)
              : $1662971556_$4292174816_setVal(t, val.val, stamp, 1)
          ) {
            changed = true
          }
        }
      }

      if (reset && $1662971556_$4292174816_removeSomeFields(t, stamp, val, void 0, true)) changed = true

      if (changed) {
        if (stamp) { $1662971556_$2092109398_data(t, val, stamp, override, isNew) }
        return true
      } else if (stamp !== t.tStamp) {
        $1662971556_$2092109398_overrideSubscription(t, override, stamp, isNew)
      }
    }
  }
}

const $1662971556_$4292174816_objects = (t, val, stamp, isNew, reset) => {
  if (val.stamp) {
    return $1662971556_$4292174816_overrideObjects(t, val, stamp, isNew, reset)
  } else if (t.instances) {
    let changed
    for (let key in val) {
      if (key !== 'stamp') {
        let result = key !== 'val'
            ? $1662971556_$624523381_getProp(t, key)(t, val[key], key, stamp, isNew, reset, val)
            : $1662971556_$4292174816_setVal(t, val.val, stamp, 1)
        if (result) {
          if (!changed) {
            changed = result === 2 ? [] : [ key ]
          } else if (result !== 2) {
            changed.push(key)
          }
        }
      }
    }
    if (reset) {
      const changeNest = $1662971556_$4292174816_removeSomeFields(t, stamp, val, changed)
      if (!changed) changed = changeNest
    }
    if (changed) {
      if (stamp) { $1662971556_$2092109398_data(t, val, stamp, false, isNew) }
      $1662971556_$1506544200(t, val, stamp, changed)
      return true
    }
  } else {
    let changed
    for (let key in val) {
      if (
        key !== 'val'
          ? $1662971556_$624523381_getProp(t, key)(t, val[key], key, stamp, isNew, reset, val)
          : $1662971556_$4292174816_setVal(t, val.val, stamp, 1)
      ) {
        changed = true
      }
    }

    if (reset && $1662971556_$4292174816_removeSomeFields(t, stamp, val, void 0, true)) changed = true

    if (changed) {
      if (stamp) { $1662971556_$2092109398_data(t, val, stamp, false, isNew) }
      return true
    }
  }
}

const $1662971556_$4292174816_set = (t, val, stamp, isNew, reset) => {
  if (t._c) {
    return $1662971556_$2633820941_resolveContext(t, val, stamp, reset)
  } else {
    const type = typeof val
    if (type === 'function') {
      if ($1662971556_$2380202644_isGeneratorFunction(val)) {
        $1662971556_$2380202644_generator(t, val, stamp)
      } else if ($1662971556_$4292174816_setVal(t, val, stamp)) {
        if (reset) $1662971556_$4292174816_removeAllFields(t, stamp)
        return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
      } else if (reset && $1662971556_$4292174816_removeAllFields(t, stamp)) {
        return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
      }
    } else if (type === 'object') {
      if (!val) {
        return $1662971556_$2839414644(t, stamp)
      } else {
        if (val.inherits) {
          if ($1662971556_$4292174816_setVal(t, val, stamp, true)) {
            if (reset) $1662971556_$4292174816_removeAllFields(t, stamp)
            return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
          } else if (reset && $1662971556_$4292174816_removeAllFields(t, stamp)) {
            return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
          }
        } else if (val.then && typeof val.then === 'function') {
          // handle reset :X ?
          $1662971556_$2380202644_promise(t, val, stamp)
        } else if (val.next && typeof val.next === 'function') {
          // handle reset :X ?
          $1662971556_$2380202644_iterator(t, val, stamp)
        } else if (val[0] && val[0] === '@') {
          if ($1662971556_$2164199530_reference(t, val, stamp)) {
            if (reset) $1662971556_$4292174816_removeAllFields(t, stamp)
            return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
          } else if (reset && $1662971556_$4292174816_removeAllFields(t, stamp)) {
            return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
          }
        } else {
          return $1662971556_$4292174816_objects(t, val, stamp, isNew, reset)
        }
      }
    } else if ($1662971556_$4292174816_setVal(t, val, stamp)) {
      if (reset) $1662971556_$4292174816_removeAllFields(t, stamp)
      return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
    } else if (reset && $1662971556_$4292174816_removeAllFields(t, stamp)) {
      return $1662971556_$4292174816_isChanged(t, val, stamp, isNew)
    }
  }
}

const $1662971556_$4292174816_isChanged = (t, val, stamp, isNew) => {
  if (stamp) { $1662971556_$2092109398_data(t, val, stamp, false, isNew) }
  if (t.instances) { $1662971556_$1506544200(t, val, stamp, true) }
  return true
}

const $1662971556_$4292174816_getOnProp = t => t.props && t.props.on || $1662971556_$4292174816_getOnProp(t.inherits)

const $1662971556_$4292174816_onContext = (t, context) => {
  if (t.emitters) {
    if (context) {
      t.emitters._c = context
      t.emitters._cLevel = 1
    }
  } else if (t.inherits) {
    $1662971556_$4292174816_onContext(t.inherits, context || t)
  }
}

const $1662971556_$4292174816_setVal = (t, val, stamp, ref) => {
  if (t.val !== val) {
    if (ref) {
      if (ref === 1) {
        if (typeof val === 'object') {
          if (!val.inherits) {
            if (val[0] && val[0] === '@') {
              return $1662971556_$2164199530_reference(t, val, stamp)
            } else {
              $1662971556_$2164199530_removeReference(t)
              if (val.then && typeof val.then === 'function') {
                $1662971556_$2380202644_promise(t, val, stamp)
                return
              } else if (val.next && typeof val.next === 'function') {
                $1662971556_$2380202644_iterator(t, val, stamp)
                return
              }
              t.val = val
              return true
            }
          }
        } else {
          $1662971556_$2164199530_removeReference(t)
          t.val = val
          return true
        }
      }
      $1662971556_$2164199530_removeReference(t)
      t.val = val
      if (val.emitters) {
        if (!val.emitters.data) {
          $1662971556_$4292174816_getOnProp(val)(val, { data: void 0 }, 'on')
        }
        $1662971556_$1442998772_listener(val.emitters.data, t, $1662971556_$3258224650_uid(t))
      } else {
        $1662971556_$4292174816_onContext(val)
        $1662971556_$4292174816_getOnProp(val)(val, { data: void 0 }, 'on')
        $1662971556_$1442998772_listener(val.emitters.data, t, $1662971556_$3258224650_uid(t))
      }
      $1662971556_$2164199530_resolveFromValue(t, val, stamp)
    } else {
      $1662971556_$2164199530_removeReference(t)
      t.val = val
    }
    return true
  }
}


var $1662971556_$4292174816_resolveReferences = $1662971556_$2164199530_resolveReferences;
var $1662971556_$4292174816_$ALL$ = {
  set: $1662971556_$4292174816_set,
  create: $1662971556_$4292174816_create,
  resolveReferences: $1662971556_$2164199530_resolveReferences
}
;







const $1662971556_$430509040_inheritType = t => t.type || t.inherits && $1662971556_$430509040_inheritType(t.inherits)

const $1662971556_$430509040_type = (t, val, key, stamp, isNew, original) => {
  var isObject
  if (typeof val === 'object') {
    if (!val) {
      // 'remove type' -- not supported yet...
    } else if (val.stamp && val.val && !val.inherits) {
      if (!stamp) stamp = val.stamp
      val = val.val
    } else if (val.inherits) {
      isObject = true
      return
    } else {
      isObject = true
      return
    }
  }

  if (!isNew && t._p) {
    if (isObject) {
      // 'switch using object - not supported yet'
    } else {
      let type = t.type || $1662971556_$430509040_inheritType(t)
      type = type && type.compute()
      if (type !== val) {
        $1662971556_$2264940719_switchInheritance(t, $1662971556_$2411079736(t._p, val, t, stamp), stamp)
        // if (original.reset) set(t, { reset: true }, stamp) // maybe deprecate this...
      }
    }
  }

  if (t.type) {
    return $1662971556_$4292174816_set(t.type, val, stamp) && 2
  } else {
    t.type = $1662971556_$4292174816_create($1662971556_$624523381_getProp(t, key).struct, val, stamp, t, key)
    return 2
  }
}

const $1662971556_$430509040_inherits = (prop, t) => {
  while (t) {
    if (t === prop) return true
    t = t.inherits
  }
}

const $1662971556_$430509040_types = struct => {
  const types = (t, val, key, stamp) => {
    // decided to not support references, when using a struct it automaticly becomes the type
    var changed
    if (!t.types) {
      const prop = $1662971556_$624523381_getProp(t, key).struct
      let cntx = $1662971556_$2621634261_get(t, 'types')
      if (cntx && !$1662971556_$430509040_inherits(prop, cntx)) cntx = false
      t.types = $1662971556_$4292174816_create(cntx || prop, void 0, stamp, t, key)
      if (!cntx) changed = 2
    }
    $1662971556_$4292174816_set(t.types, val, stamp)
    return changed
  }

  types.struct = $1662971556_$4292174816_create(struct, {
    instances: false,
    props: {
      default: (t, val, key, stamp, isNew) => {
        var changed
        const result = $1662971556_$2621634261_get(t, key)
        if (result) {
          if (result._c) {
            $1662971556_$2633820941_contextProperty(t, val, stamp, key, result)
          } else {
            $1662971556_$4292174816_set(result, val, stamp)
            changed = val === null
          }
        } else {
          $1662971556_$466859286_addKey(t, key)
          if (val === 'self') {
            t[key] = t._p
          } else if (typeof val === 'object' && val.inherits) {
            t[key] = val
          } else {
            $1662971556_$4292174816_create($1662971556_$2621634261_getDefault(t._p), val, stamp, t, key)
          }
          changed = true
        }
        return changed
      }
    }
  })

  types.struct.props.default.struct = $1662971556_$430509040_type.struct = struct
  $1662971556_$4292174816_set(struct, { props: { type: $1662971556_$430509040_type, types }, types: { struct } })
  struct.types._ks = void 0 // remove struct key
  struct.type = $1662971556_$4292174816_create(struct, 'struct')
}


var $1662971556_$430509040_getType = $1662971556_$2411079736;
var $1662971556_$430509040_$ALL$ = {
  types: $1662971556_$430509040_types,
  getType: $1662971556_$2411079736
}
;

const $1662971556_$1998416981_inject = (t, val, stamp) => typeof val === 'function'
  ? val(t, val, stamp)
  : $1662971556_$4292174816_set(t, val, stamp)

var $1662971556_$1998416981 = (t, val, key, stamp) => {
  var changed
  if (Array.isArray(val)) {
    for (let i = 0, len = val.length; i < len; i++) {
      if ($1662971556_$1998416981_inject(t, val[i], stamp)) {
        changed = true
      }
    }
  } else {
    changed = $1662971556_$1998416981_inject(t, val, stamp)
  }
  return changed
}

;



var $1662971556_$506167339 = struct => {
  const emitter = $1662971556_$4292174816_create(struct, {
    instances: false,
    props: { default: $1662971556_$1442998772_listener }
  })

  const update = (t, val, key, original) => {
    if (!(key in t)) {
      const field = val[key]
      if (!field || typeof field === 'function') {
        if (field === null) {
          $1662971556_$1442998772_replace(t.fn, original[key])
        } else {
          $1662971556_$1442998772_addFn(t, field)
        }
        return true
      }
    }
  }

  const instances = (t, val, original, fields) => {
    let i = t.instances.length
    while (i--) {
      let instance = t.instances[i]
      if (instance.fn) {
        if (!fields) { fields = Object.keys(val) }  // can use something else for perf
        let j = fields.length
        if (instance.instances) {
          let inherits
          while (j--) {
            let key = fields[j]
            if (update(instance, val, key, original)) {
              if (!inherits) {
                inherits = [ key ]
              } else {
                inherits.push(key)
              }
            }
          }
          if (inherits) { instances(instance, val, original, inherits) }
        } else {
          while (j--) { update(instance, val, fields[j], original) }
        }
      } else if (instance.instances) {
        instances(instance, val, original, fields)
      }
    }
  }

  const emitterProperty = (t, val, key, stamp) => {
    if (val && key in t && t.instances) {
      const field = t[key]
      if (field) { instances(field, val, field) }
    }
    return $1662971556_$624523381_property(t, val, key, stamp, emitter)
  }

  emitterProperty.struct = emitter

  const getOn = t => t.emitters || t.inherits && getOn(t.inherits)

  const onStruct = $1662971556_$4292174816_create(struct, {
    instances: false,
    props: {
      default: emitterProperty
    }
  })

  const on = (t, val, key, stamp) => {
    if (val) {
      if (typeof val === 'function') {
        val = { data: { _val: val } }
      } else {
        for (let key in val) {
          let emitter = val[key]
          if (emitter) {
            if (typeof emitter === 'function') {
              val[key] = { _val: emitter }
            } else {
              if (emitter.val) {
                emitter._val = emitter.val
                delete emitter.val
              }
            }
          }
        }
      }
    }
    const result = getOn(t)
    if (result) {
      if (!t.emitters) {
        $1662971556_$4292174816_create(result, val, stamp, t, 'emitters')
      } else {
        $1662971556_$4292174816_set(result, val, stamp)
      }
    } else {
      $1662971556_$4292174816_create(onStruct, val, stamp, t, 'emitters')
    }
  }

  struct.props.on = on
  on.struct = onStruct
}

;






const $1662971556_$3707563476_struct = {}

const $1662971556_$3707563476_props = {
  inject: $1662971556_$1998416981,
  _created: (t, val) => { t._created = val },
  async: (t, val) => { if (t.async && !val) { delete t.async } },
  key: (t, val) => { t.key = val },
  instances: (t, val) => { t.instances = val },
  $transform: (t, val) => { t.$transform = val },
  props: (t, val, pkey, stamp) => {
    var props = t.props
    if (!props) {
      const previous = $1662971556_$2621634261_getProps(t)
      props = t.props = {}
      if (previous) {
        for (let key in previous) {
          props[key] = previous[key]
        }
      }
    }
    for (let key in val) {
      $1662971556_$3707563476_parse(t, val[key], key, stamp, props)
    }
  }
}

const $1662971556_$3707563476_simple = (t, val, key) => { t[key] = val }

// key should be 4th argument
const $1662971556_$3707563476_notSelf = (t, key, struct) => t.props &&
  t.props[key] && t.props[key].struct === struct ||
  t.inherits && $1662971556_$3707563476_notSelf(t.inherits, key, struct)

const $1662971556_$3707563476_parse = (t, val, key, stamp, props) => {
  if (val === true) {
    props[key] = $1662971556_$3707563476_simple
  } else if (val === null) {
    t[key] = null
    if (props[key]) { delete props[key] }
  } else if (typeof val !== 'function') {
    let struct
    if (typeof val === 'object' && val.inherits) {
      struct = val
    } else if (val === 'self') {
      struct = t
    } else {
      const inherit = props[key] && props[key].struct
      if (inherit) {
        if ($1662971556_$3707563476_notSelf(t.inherits, key, inherit)) {
          struct = $1662971556_$4292174816_create(inherit, val, void 0, t)
        } else {
          $1662971556_$4292174816_set(inherit, val)
          return
        }
      } else {
        struct = $1662971556_$4292174816_create($1662971556_$2621634261_getDefault(t), val, void 0, t)
      }
    }

    const definition = (t, val, key, stamp, isNew, reset) =>
      $1662971556_$624523381_property(t, val, key, stamp, struct, isNew, reset)

    definition.struct = struct
    props[key] = definition
  } else {
    props[key] = val
  }
}

const $1662971556_$3707563476_define = (t, value, key) => {
  Object.defineProperty(t, key, { configurable: true, value })
  return t
}

const $1662971556_$3707563476_createConstructor = (t, Inherit) => {
  function Struct () {}
  if (Inherit) { Struct.prototype = new Inherit() }
  $1662971556_$3707563476_define(Struct.prototype, Struct, 'Constructor')
  $1662971556_$3707563476_define(t, Struct, 'Constructor')
  return Struct
}

$1662971556_$3707563476_struct.instances = false
$1662971556_$3707563476_struct.props = $1662971556_$3707563476_props

$1662971556_$3707563476_createConstructor($1662971556_$3707563476_struct)

$1662971556_$3707563476_struct.props.define = (t, val) => {
  var proto
  if (!t.hasOwnProperty('Constructor')) {
    $1662971556_$3707563476_createConstructor(t, t.Constructor)
  }
  proto = t.Constructor.prototype
  for (let key in val) {
    $1662971556_$3707563476_define(t, val[key], key)
    $1662971556_$3707563476_define(proto, val[key], key)
  }
}

$1662971556_$3707563476_props.default = (t, val, key, stamp) => $1662971556_$624523381_property(t, val, key, stamp, $1662971556_$3707563476_struct)
$1662971556_$3707563476_props.default.struct = $1662971556_$3707563476_struct
$1662971556_$3707563476_struct.inherits = {}

$1662971556_$1998416981($1662971556_$3707563476_struct, [ $1662971556_$506167339, $1662971556_$430509040_types ])

var $1662971556_$3707563476 = $1662971556_$3707563476_struct

;const $1662971556_$958575751_get = t => t.val !== void 0
  ? t.val : t.inherits && $1662971556_$958575751_get(t.inherits)

const $1662971556_$958575751_origin = t => t.val && typeof t.val === 'object' && t.val.inherits
  ? $1662971556_$958575751_origin(t.val) : t

const $1662971556_$958575751_transform = t => t.$transform !== void 0
  ? t.$transform
  : t.inherits && $1662971556_$958575751_transform(t.inherits)

const $1662971556_$958575751_compute = (t, val, passon, arg) => {
  if (val === void 0) {
    val = t.val
    if (val === void 0) { val = $1662971556_$958575751_get(t.inherits) }
  }
  if (val) {
    const type = typeof val
    if (type === 'object') {
      if (val.inherits) {
        const v = val
        val = $1662971556_$958575751_compute(val, void 0, passon, arg)
        if (val === void 0) {
          val = v
        }
      }
    } else if (type === 'function') {
      val = val(val, passon || t)
    }
  }
  const trans = $1662971556_$958575751_transform(t)
  return trans ? trans(val, passon || t, arg) : val
}



var $1662971556_$958575751_$ALL$ = {
  origin: $1662971556_$958575751_origin,
  compute: $1662971556_$958575751_compute
}
;


var $1662971556_$2030617653_uid = 0

var $1662971556_$2030617653 = (t, check, callback) => {
  var id = 'O' + ++$1662971556_$2030617653_uid
  if (!callback) {
    let promise
    if (check === void 0) {
      promise = new Promise(resolve => $1662971556_$2030617653_on(t, id, (t, val, stamp) => {
        resolve(t, val, stamp)
        return true
      }))
    } else {
      promise = new Promise(resolve => {
        if (!$1662971556_$2030617653_evaluate(resolve, check, t)) {
          $1662971556_$2030617653_on(t, id, (val, stamp, t) => $1662971556_$2030617653_evaluate(resolve, check, t, val, stamp, true))
        }
      })
    }
    return promise
  } else {
    if (check === void 0) {
      $1662971556_$2030617653_on(t, id, (val, stamp, t) => {
        callback(val, stamp, t)
        return true
      })
    } else {
      if (!$1662971556_$2030617653_evaluate(callback, check, t)) {
        $1662971556_$2030617653_on(t, id, (val, stamp, t) => $1662971556_$2030617653_evaluate(callback, check, t, val, stamp))
      }
    }
    return id
  }
}

const $1662971556_$2030617653_evaluate = (resolve, check, t, val, stamp, promise) => {
  if (typeof check === 'function'
      ? check(t, val, stamp)
      : $1662971556_$958575751_compute(t) == check //eslint-disable-line
    ) {
    if (stamp && !promise) {
      $1662971556_$826337949.on(() => resolve(val, stamp, t))
    } else {
      resolve(val, stamp, t)
    }
    return true
  }
}

const $1662971556_$2030617653_on = (top, id, listener) => {
  const context = $1662971556_$4292174816_set(top, {
    on: {
      data: {
        [id]: (val, stamp, t) => {
          if (!t._c) {
            if (listener(val, stamp, t)) {
              $1662971556_$4292174816_set(t, { on: { data: { [id]: null } } })
            }
          }
        }
      }
    }
  })
  if (context && context.inherits) { top = context }
  return top
}

;



const $1662971556_$2137229723_remove = (subs, cb, tree) => {
  const t = tree.$t

  if (tree.$tc) {
    if (tree.$stored) {
      tree.$stored.unshift(tree.$tc, tree.$tcl || 1)
      $1662971556_$2633820941_applyContext(t, tree.$stored)
    } else {
      $1662971556_$2633820941_applyContext(t, [ tree.$tc, tree.$tcl ])
    }
  }

  if (subs.val) { cb(t, 'remove', subs, tree) }
  if (!subs.$blockRemove) {
    $1662971556_$3975723928_diff(t, subs, cb, tree, true)
  }
  const key = tree._key
  const parent = tree._p
  if (parent.$keys) {
    if (Array.isArray(parent.$keys)) {
      parent.$keys.splice(key, 1)
      const len = parent.$keys.length
      let i = len
      if (tree.$c) {
        while (i-- > key) {
          parent.$keys[i]._key = i
        }
        if (parent.$c[len]) {
          $1662971556_$2137229723_composite(parent, len)
        }
      } else {
        while (i-- > key) {
          parent.$keys[i]._key = i
        }
      }
    } else {
      if (tree.$c && parent.$c[key]) { $1662971556_$2137229723_composite(parent, key) }
      delete parent.$keys[key]
    }
  } else {
    if (tree.$c) { $1662971556_$2137229723_composite(parent, key) }
    delete parent[key]
  }
}

const $1662971556_$2137229723_empty = (obj) => {
  for (let key in obj) {
    return false
  }
  return true
}

const $1662971556_$2137229723_composite = (tree, key) => {
  var rootClear
  while (tree) {
    if (tree.$c) {
      if (tree.$c[key]) {
        if (tree.$c[key] === 'root') { rootClear = true }
        delete tree.$c[key]
        if ($1662971556_$2137229723_empty(tree.$c)) {
          delete tree.$c
          key = tree._key
          tree = tree._p
        } else {
          if (rootClear) {
            let block
            for (let i in tree.$c) {
              if (tree.$c[i] === 'root') {
                block = true
                break
              }
            }
            if (!block) { $1662971556_$2137229723_clearRootComposite(tree) }
          }
          break
        }
      }
    } else {
      if (rootClear && tree._key === 'parent') {
        $1662971556_$2137229723_clearRootComposite(tree)
      }
      break
    }
  }
}

const $1662971556_$2137229723_clearRootComposite = (tree) => {
  tree = tree._p
  var key = 'parent'
  var cnt = 0
  while (tree) {
    if (key === 'root') {
      break
    } else {
      if (key === 'parent') {
        cnt++
      } else if (key[0] !== '$') {
        cnt--
      }
      if (tree.$c && tree.$c[key]) {
        if (cnt > 0) {
          tree.$c[key] = 'parent'
          for (var i in tree.$c) {
            if (i !== key) {
              if (tree.$c[i] === 'root') {
                tree = false
              }
            }
          }
          if (tree) {
            key = tree._key
            tree = tree._p
          }
        } else {
          delete tree.$c[key]
          if ($1662971556_$2137229723_empty(tree.$c)) {
            delete tree.$c
            key = tree._key
            tree = tree._p
          } else {
            break
          }
        }
      } else {
        key = tree._key
        tree = tree._p
      }
    }
  }
}

var $1662971556_$2137229723 = $1662971556_$2137229723_remove

;





const $1662971556_$4215657123_store = (t, branch) => {
  if (t._c._c) {
    branch.$stored = $1662971556_$2633820941_storeContext(t._c)
  }
  branch.$tc = t._c
  if (t._cLevel > 1) {
    branch.$tcl = t._cLevel
  }
}

const $1662971556_$4215657123_dummy = 0

const $1662971556_$4215657123_switchuid = t => {
  var uid = 5381
  while (t && t.val && typeof t.val === 'object' && t.val.inherits) {
    t = t.val
    uid * 33 ^ $1662971556_$3258224650_puid(t)
  }
  return uid >>> 0
}

const $1662971556_$4215657123_update = (key, t, subs, cb, tree, c, parent) => {
  var branch = tree[key]
  var changed
  if (t) {
    // console.log('PROPERTY:', t, !!(branch && branch.$c))

    const stamp = t.tStamp || $1662971556_$4215657123_dummy  // needs to use stamp as well (if dstamp is gone)
    if (!branch) {
      branch = tree[key] = { _p: parent || tree, _key: key, $t: t }
      branch.$ = stamp
      if (t._c) { $1662971556_$4215657123_store(t, branch) }
      if (subs.val) {
        cb(t, 'new', subs, branch)
        changed = true
      }
      changed = $1662971556_$3975723928_diff(t, subs, cb, branch, void 0, c) || changed
      // ! && ! || !== (thats why != may need to replace)
    } else if (branch.$ !== stamp || branch.$t !== t || branch.$tc != t._c) { //eslint-disable-line
      if (subs.val) {
        if (
          // will become parsed -- with intergers -- also switcgh returns will be parsed
          subs.val === true ||
          subs.val === 'shallow' ||
          (subs.val === 'switch' && (
            branch.$t !== t ||
            // (delete / void 0 field later)
            branch.$tc != t._c || // eslint-disable-line
            (t.val && typeof t.val === 'object' && t.val.inherits && branch.$val !== $1662971556_$4215657123_switchuid(t)) ||
            branch.$val // means removed reference
          ))
        ) {
          changed = true
          cb(t, 'update', subs, branch)
        }
      }

      branch.$ = stamp

      if (t._c) {
        $1662971556_$4215657123_store(t, branch)
      } else if (branch.$tc) {
        delete branch.$tc
        if (branch.$tcl) {
          delete branch.$tcl
        }
        if (branch.$stored) {
          delete branch.$stored
        }
      }
      branch.$t = t
      if (subs.val === 'switch') {
        if ((t.val && typeof t.val === 'object' && t.val.inherits)) {
          branch.$val = $1662971556_$4215657123_switchuid(t)
        } else if (branch.$val) {
          delete branch.$val
        }
      }
      changed = $1662971556_$3975723928_diff(t, subs, cb, branch, void 0, c) || changed
    } else if (branch.$c) {
      // console.log('go $c!', branch.$)
      if ($1662971556_$3975723928_diff(t, subs, cb, branch, void 0, branch.$c)) {
        // console.log('CHANGED', t)
        changed = true // cover this
        // shallow hack
        // maybe add switch as well?
        if (subs.val === true || subs.val === 'shallow') {
          cb(t, 'update', subs, branch)
        }
      }
    }
  } else if (branch) {
    changed = $1662971556_$2137229723(subs, cb, branch) || (subs.val && true)
  }
  return changed
}

const $1662971556_$4215657123_property = (key, t, subs, cb, tree, removed, composite) => {
  var changed
  if (removed) {
    const branch = tree[key]
    if (branch) {
      changed = $1662971556_$2137229723(subs, cb, branch) || (subs.val && true)
    }
  } else {
    t = $1662971556_$2621634261_getOrigin(t, key)
    changed = $1662971556_$4215657123_update(
      key,
      t,
      subs,
      cb,
      tree,
      composite
    )
  }
  return changed
}



var $1662971556_$4215657123_$ALL$ = {
  property: $1662971556_$4215657123_property,
  update: $1662971556_$4215657123_update
}
;





const $1662971556_$2247350659_inherits = (key, t, index) => {
  var i = 0
  while (i < index && t && typeof t === 'object' && t.inherits) {
    i++
    if (key in t) {
      return false
    }
    t = t.val
  }
  return true
}

const $1662971556_$2247350659_parseKeys = (t) => {
  var keys = $1662971556_$466859286_getKeys(t)
  var orig = t
  t = t.val
  if (t && typeof t === 'object' && t.inherits) {
    let combined
    let index = 1
    while (t && typeof t === 'object' && t.inherits) {
      let k = $1662971556_$466859286_getKeys(t)
      let kl = k && k.length
      if (kl) {
        if (!combined) {
          if (keys) {
            combined = []
            for (let j = 0, len = keys.length; j < len; j++) {
              combined[j] = keys[j]
            }
            for (let i = 0; i < kl; i++) {
              if ($1662971556_$2247350659_inherits(k[i], orig, index)) {
                combined.push(k[i])
              }
            }
          } else {
            keys = k
          }
        } else {
          for (let i = 0; i < kl; i++) {
            if ($1662971556_$2247350659_inherits(k[i], orig, index)) {
              combined.push(k[i])
            }
          }
        }
      }
      index++
      t = t.val
    }
    return combined || keys
  }
  return keys
}

const $1662971556_$2247350659_composite = (key, t, subs, cb, branch, removed, c) => {
  var changed
  const keys = branch.$keys
  if (subs.$keys && subs.$keys.val) {
    const dKey = '$keys' + key
    if (c[dKey] && $1662971556_$3975723928_diff(t, subs.$keys, cb, branch[dKey])) {
      $1662971556_$2247350659_any(key, t, subs, cb, branch._p, removed)
    } else {
      for (let k in c) {
        let target = keys[k]
        if (
          k !== dKey &&
          $1662971556_$4215657123_update(k, target.$t, subs, cb, keys, target.$c, branch)
        ) {
          changed = true
        }
      }
    }
  } else {
    for (let k in c) {
      let target = keys[k]
      if (target) {
        if ($1662971556_$4215657123_update(k, target.$t, subs, cb, keys, target.$c, branch)) {
          changed = true
        }
      }
    }
  }
  return changed
}

const $1662971556_$2247350659_any = (key, t, subs, cb, tree, removed) => {
  const branch = tree[key]
  var $object
  if (removed || !t) {
    if (branch) {
      $1662971556_$2247350659_removeFields(key, subs, branch, cb, tree)
      return true
    }
  } else {
    let keys = $1662971556_$2247350659_parseKeys(t)
    if (subs.$keys) {
      if (subs.$keys.val) {
        $object = subs.$keys.$object
        keys = subs.$keys.val(keys || [], t, subs, tree)
      } else {
        keys = subs.$keys(keys || [], t, subs, tree)
      }
    }
    if (keys) {
      if (!branch) {
        if ($object) {
          $1662971556_$2247350659_createObject(key, keys, t, subs, cb, tree)
        } else {
          $1662971556_$2247350659_create(key, keys, t, subs, cb, tree)
        }
        return true
      } else {
        // $object
        return $object
          ? $1662971556_$2247350659_updateObject(key, keys, t, subs, cb, branch)
          : $1662971556_$2247350659_update(key, keys, t, subs, cb, branch)
      }
    } else if (branch) {
      if ($object) {
        $1662971556_$2247350659_removeFieldsObject(key, subs, branch, cb, tree)
      } else {
        $1662971556_$2247350659_removeFields(key, subs, branch, cb, tree)
      }
      return true
    }
  }
}

// AS ARRAY
const $1662971556_$2247350659_create = (key, keys, t, subs, cb, tree) => {
  const len = keys.length
  const $keys = new Array(len)
  const branch = tree[key] = { _p: tree, _key: key, $keys }
  for (let i = 0; i < len; i++) {
    let key = keys[i]
    let tt = $1662971556_$2621634261_getOrigin(t, key)
    $1662971556_$4215657123_update(i, tt, subs, cb, $keys, void 0, branch)
  }
  if (subs.$keys && subs.$keys.val) {
    const dKey = '$keys' + key
    const dBranch = branch[dKey] = { _p: branch, _key: dKey }
    $1662971556_$3975723928_diff(t, subs.$keys, cb, dBranch)
  }
}

const $1662971556_$2247350659_removeFields = (key, subs, branch, cb, tre) => {
  const $keys = branch.$keys
  let i = $keys.length
  while (i--) {
    $1662971556_$2137229723(subs, cb, $keys[0])
  }
}

const $1662971556_$2247350659_update = (key, keys, t, subs, cb, branch) => {
  var changed
  const $keys = branch.$keys
  const len1 = keys.length
  var len2 = $keys.length
  if (len1 > len2) {
    for (let i = 0; i < len1; i++) {
      let key = keys[i]
      let tt = $1662971556_$2621634261_getOrigin(t, key)
      if ($1662971556_$4215657123_update(i, tt, subs, cb, $keys, void 0, branch)) {
        changed = true
      }
    }
  } else {
    for (let i = 0; i < len2; i++) {
      let key = keys[i]
      if (!key) {
        $1662971556_$2137229723(subs, cb, $keys[i])
        len2--
        i--
        changed = true
      } else {
        let tt = $1662971556_$2621634261_getOrigin(t, key)
        if ($1662971556_$4215657123_update(i, tt, subs, cb, $keys, void 0, branch)) {
          changed = true
        }
      }
    }
  }
  return changed
}
// ------AS OBJECT
const $1662971556_$2247350659_createObject = (key, keys, t, subs, cb, tree) => {
  const len = keys.length
  const $keys = {}
  const branch = tree[key] = { _p: tree, _key: key, $keys }
  for (let i = 0; i < len; i++) {
    let key = keys[i]
    let tt = $1662971556_$2621634261_getOrigin(t, key)
    $1662971556_$4215657123_update(key, tt, subs, cb, $keys, void 0, branch)
  }

  if (subs.$keys && subs.$keys.val) {
    const dKey = '$keys' + key
    const dBranch = branch[dKey] = { _p: branch, _key: dKey }
    $1662971556_$3975723928_diff(t, subs.$keys, cb, dBranch)
  }
}

const $1662971556_$2247350659_removeFieldsObject = (key, subs, branch, cb, tre) => {
  const $keys = branch.$keys
  for (let key$ in $keys) {
    $1662971556_$2137229723(subs, cb, $keys[key$])
  }
}

const $1662971556_$2247350659_updateObject = (key$, keys, t, subs, cb, branch) => {
  var changed
  const $keys = branch.$keys
  const len1 = keys.length
  const marked = {}
  for (let i = 0; i < len1; i++) {
    let key = keys[i]
    marked[key] = true
    let tt = $1662971556_$2621634261_getOrigin(t, key)
    if ($1662971556_$4215657123_update(key, tt, subs, cb, $keys, void 0, branch)) {
      changed = true
    }
  }
  for (let key in $keys) {
    if (!(key in marked)) {
      $1662971556_$2137229723(subs, cb, $keys[key])
    }
  }
  return changed
}

// ---- for composite it is not a difference


var $1662971556_$2247350659_$ALL$ = {
  any: $1662971556_$2247350659_any,
  composite: $1662971556_$2247350659_composite
}
;


var $1662971556_$2032740883 = (t, subs, cb, tree, removed) => {
  var branch = tree.root
  if (t && !removed) {
    if (!branch) {
      branch = tree.root = { _key: 'root', _p: tree }
      $1662971556_$2032740883_composite(tree)
    }
    return $1662971556_$3975723928_diff($1662971556_$1695496138_root(t), subs, cb, branch)
  } else if (branch) {
    $1662971556_$3975723928_diff(branch.$t, subs, cb, branch, true)
    return true
  }
}

const $1662971556_$2032740883_composite = tree => {
  var key = 'root'
  while (
    tree._p &&
    (!(tree.$c) ||
    !(key in tree.$c) ||
    tree.$c[key] !== 'root')
  ) {
    let tkey = tree._key
    if (tkey !== 'parent' && tkey !== 'root') {
      if (!('$c' in tree)) { tree.$c = {} }
      tree.$c[key] = 'root'
    }
    key = tkey
    tree = tree._p
  }
}

;




const $1662971556_$1269477831_CompositeDriverChange = (key, tkey, t, subs, cb, tree, removed, composite) => {
  const branch = tree[key]
  if ($1662971556_$3975723928_diff(t, subs, cb, branch, removed, composite)) {
    return $1662971556_$1269477831_body(tkey, t, subs, cb, tree, removed, subs.val, false, composite)
  }
}

const $1662971556_$1269477831_$switch = (key, t, subs, cb, tree, removed, composite) => {
  var $switch = subs[key]
  if (!$switch) {
    const tkey = key.slice(0, -1) // this means from composite
    $1662971556_$1269477831_CompositeDriverChange(key, tkey, t, subs[tkey], cb, tree, removed, composite)
  } else {
    if ($switch.val) {
      const dKey = key + '*'
      const driverBranch = tree[dKey]
      if (driverBranch) {
        if ($1662971556_$3975723928_diff(t, $switch, cb, driverBranch, removed, composite)) {
          return $1662971556_$1269477831_body(key, t, subs, cb, tree, removed, $switch.val, true, composite)
        } else {
          const branch = tree[key]
          if (branch) { $1662971556_$4215657123_update(key, t, branch.$subs, cb, tree, composite) }
        }
      } else if (!driverBranch) {
        if ($1662971556_$1269477831_create(dKey, t, $switch, cb, tree)) {
          return $1662971556_$1269477831_body(key, t, subs, cb, tree, removed, $switch.val, true, composite)
        }
      }
    } else {
      return $1662971556_$1269477831_body(key, t, subs, cb, tree, removed, $switch, true, composite)
    }
  }
}

const $1662971556_$1269477831_create = (key, t, subs, cb, tree) => {
  const branch = tree[key] = {
    _p: tree,
    _key: key,
    $subs: subs
  }
  return $1662971556_$3975723928_diff(t, subs, cb, branch)
}

const $1662971556_$1269477831_body = (key, t, subs, cb, tree, removed, $switch, diffit, composite) => {
  var result
  if (!removed && t) { result = $switch(t, subs, tree, key) }
  var branch = tree[key]
  if (!result) {
    if (branch) {
      $1662971556_$2137229723(branch.$subs, cb, branch)
      return true
    }
  } else {
    if (!branch) {
      $1662971556_$4215657123_update(key, t, result, cb, tree)
      branch = tree[key]
      branch.$subs = result
      branch.$origin = $1662971556_$958575751_origin(t)
      return true
    } else if ($1662971556_$1269477831_isSwitched(branch.$subs, result, branch, t)) {
      $1662971556_$2137229723(branch.$subs, cb, branch)
      $1662971556_$4215657123_update(key, t, result, cb, tree)
      branch = tree[key]
      branch.$subs = result
      branch.$origin = $1662971556_$958575751_origin(t)
      return true
    } else if (diffit) {
      return $1662971556_$4215657123_update(key, t, result, cb, tree, composite)
    }
  }
}

const $1662971556_$1269477831_isSwitched = (a, b, branch, t) => {
  if (t) {
    const o = $1662971556_$958575751_origin(t)
    const b = branch.$origin
    if (b !== o) {
      branch.$origin = o
      return true
    }
  }
  if (a === b) {
    return false // test
  } else {
    if (a._) {
      return a._ !== b._
    }
    for (let key in a) {
      if (a[key] !== b[key]) {
        if (typeof a[key] === 'function' && typeof b[key] === 'function') {
          if (a[key].toString() !== b[key].toString()) {
            return true
          }
        } else if (typeof a[key] !== 'object' || typeof b[key] !== 'object' || $1662971556_$1269477831_isSwitched(a[key], b[key])) {
          return true
        }
      }
    }
    for (let key in b) {
      if (key !== 'props' && !a[key]) { return true }
    }
  }
}

var $1662971556_$1269477831 = $1662971556_$1269477831_$switch

;



var $1662971556_$3087050025 = (t, subs, cb, tree, removed) => {
  var branch = tree.parent
  if (!removed && t) {
    if (!branch) {
      branch = tree.parent = { _p: tree, _key: 'parent' }
      $1662971556_$3087050025_composite(tree)
    }
    const parente = $1662971556_$3087050025_getParent(t, tree)
    const c = $1662971556_$3975723928_diff(parente, subs, cb, branch)
    return c
  } else if (branch) {
    $1662971556_$3975723928_diff(branch.$t, subs, cb, branch, true)
    return true
  }
}

const $1662971556_$3087050025_get = (t, path) => {
  let i = path.length
  while (i--) {
    if (path[i] === 'root') {
      t = $1662971556_$1695496138_root(t)
    } else {
      // this is dangerous in context!
      t = $1662971556_$2621634261_getOrigin(t, path[i])
    }
  }
  return t
}

const $1662971556_$3087050025_getParent = (t, tree) => {
  var path = []
  var cnt = 1
  var i = 0
  while (tree) {
    if (tree._key !== void 0) {
      if (tree._key[0] !== '$') {
        if (tree._key === 'parent') {
          cnt++
        } else {
          if (cnt) {
            cnt--
          } else {
            path[i++] = tree._key
          }
        }
      } else if (tree._key.indexOf('any') === 1 && path.length) {
        // refactor this a little but later
        path[0] = tree.$keys[path[0]] ? tree.$keys[path[0]].$t.key : path[0]
      }
    }
    tree = tree._p
  }
  return $1662971556_$3087050025_get($1662971556_$1695496138_root(t), path)
}

// const composite = tree => {
//   console.log('-----------------')
//   var key = 'parent'
//   while (
//     tree._p &&
//     (!(tree.$c) ||
//     !(key in tree.$c) ||
//     tree.$c[key] !== 'root')
//   ) {
//     console.log(key)
//     let tkey = tree._key
//     if (tkey !== 'parent' && tkey !== 'root') {
//       if (!('$c' in tree)) { tree.$c = {} }
//       tree.$c[key] = 'parent'
//     }
//     key = tkey
//     tree = tree._p
//   }
// }

const $1662971556_$3087050025_composite = tree => {
  var key = 'parent'
  var parentcounter = 1
  while (tree._p && parentcounter) {
    let tkey = tree._key
    if (tkey !== 'parent') {
      if (parentcounter === 1 && tkey !== 'root') {
        if (!tree.$c) { tree.$c = {} }
        if (!(key in tree.$c) || tree.$c[key] !== 'root') {
          tree.$c[key] = 'parent'
        }
      }
      key = tkey
      tree = tree._p
      if (key[0] !== '$') {
        parentcounter--
      }
    } else {
      parentcounter++
      tree = tree._p
    }
  }
}

;





const $1662971556_$3975723928_diff = (t, subs, cb, tree, removed, composite) => {
  var changed
  if (composite) {
    for (let key in composite) {
      if (key in tree) {
        let branch = tree[key]
        let c = branch.$c
        if (c) {
          if (key.indexOf('$any') === 0) {
            changed = $1662971556_$2247350659_composite(key, t, subs[key], cb, branch, removed, c)
          } else if ($1662971556_$3975723928_parse(key, t, subs, cb, tree, removed, c)) {
            changed = true
          }
        } else {
          if ($1662971556_$3975723928_parse(key, t, subs, cb, tree, removed)) {
            changed = true
          }
        }
      }
    }
  } else {
    for (let key in subs) {
      if (key !== 'val' && key !== 'props' && key !== '_' && key !== '$blockRemove' && key !== '$keys') {
        if ($1662971556_$3975723928_parse(key, t, subs, cb, tree, removed, composite)) {
          changed = true
        }
      }
    }
  }
  return changed
}

const $1662971556_$3975723928_parse = (key, t, subs, cb, tree, removed, composite) => {
  if (key === 'root') {
    return $1662971556_$2032740883(t, subs.root, cb, tree, removed)
  } else if (key === 'parent') {
    return $1662971556_$3087050025(t, subs.parent, cb, tree, removed)
  } else if (key[0] === '$') {
    if (key.indexOf('any') === 1) {
      return $1662971556_$2247350659_any(key, t, subs[key], cb, tree, removed, composite)
    } else if (key.indexOf('switch') === 1) {
      return $1662971556_$1269477831(key, t, subs, cb, tree, removed, composite)
    }
  } else {
    return $1662971556_$4215657123_property(key, t, subs[key], cb, tree, removed, composite)
  }
}




var $1662971556_$3975723928_$ALL$ = {
  diff: $1662971556_$3975723928_diff,
  parse: $1662971556_$3975723928_parse
}
;

const $1662971556_$3203877739_listen = (t, fn) => t.subscriptions.push(fn)

// add ref supports here -- use references field in prop or even simpler
const $1662971556_$3203877739_subscribe = (t, subs, cb, tree) => {
  if (!t.subscriptions) t.subscriptions = []
  if (!tree) tree = {}
  tree.$t = t
  if (subs.val) {
    if (subs.val === true || subs.val === 'shallow') {
      $1662971556_$3203877739_listen(t, () => {
        cb(t, 'update', subs, tree)
        $1662971556_$3975723928_diff(t, subs, cb, tree)
      })
    } else {
      $1662971556_$3203877739_listen(t, () => $1662971556_$3975723928_diff(t, subs, cb, tree))
    }
    cb(t, 'new', subs, tree)
  } else {
    $1662971556_$3203877739_listen(t, () => $1662971556_$3975723928_diff(t, subs, cb, tree))
  }
  $1662971556_$3975723928_diff(t, subs, cb, tree)
  return tree
}

const $1662971556_$3203877739_parse = (subs) => {
  if (subs) {
    if (subs === true) return { val: true }
    const result = {}
    for (let key in subs) {
      let sub = subs[key]
      if (key === 'val' || key === '_' || key === '$blockRemove') {
        result[key] = sub
      } else {
        let type = typeof sub
        if (type === 'object') {
          result[key] = $1662971556_$3203877739_parse(sub)
        } else if (type === 'function') {
          result[key] = sub
        } else {
          result[key] = { val: sub }
        }
      }
    }
    return result
  }
}



var $1662971556_$3203877739_$ALL$ = {
  subscribe: $1662971556_$3203877739_subscribe,
  parse: $1662971556_$3203877739_parse
}
;



const $1662971556_$2664996580_compute = (t, result) => {
  const computed = t.compute()
  return computed !== void 0 && typeof computed !== 'object' ? computed : result
}

const $1662971556_$2664996580_serialize = (t, fn) => {
  var result = {}
  var val = $1662971556_$2621634261_getVal(t)
  const keys = $1662971556_$466859286_getKeys(t)
  if (val && typeof val === 'object' && val.inherits) {
    const p = $1662971556_$1695496138_path(val) // memoized paths later
    val = [ '@', 'root' ]
    let i = p.length
    while (i--) { val[i + 2] = p[i] }
    if (t.root().key) {
      val.splice(2, 1)
    }
  }
  if (keys) {
    let onlyNumbers = true
    for (let i = 0, len = keys.length; i < len; i++) {
      let key = keys[i]
      let keyResult = $1662971556_$2664996580_serialize($1662971556_$2621634261_get(t, key), fn)
      if (isNaN(key)) onlyNumbers = false
      if (keyResult !== void 0) { result[key] = keyResult }
    }
    if (val !== void 0) {
      result.val = val
    } else if (onlyNumbers) {
      const arr = []
      for (let i in result) arr[i] = result[i]
      result = arr
    }
  } else if (val !== void 0) {
    result = val
  }
  return fn ? fn === true ? $1662971556_$2664996580_compute(t, result) : fn(t, result) : result
}

var $1662971556_$2664996580 = $1662971556_$2664996580_serialize

;


const $1662971556_$3707265278_mapper = (t) => ($1662971556_$466859286_getKeys(t) || []).map(key => $1662971556_$2621634261_get(t, key))

var $1662971556_$3707265278 = {
  map (fn, callee) {
    return ($1662971556_$466859286_getKeys(this) || []).map((val, key, array) => fn($1662971556_$2621634261_get(this, val), key, array))
  },
  reduce (fn, start) {
    return $1662971556_$3707265278_mapper(this).reduce(fn, start)
  },
  filter (fn) {
    return $1662971556_$3707265278_mapper(this).filter(fn)
  },
  slice (start, end) {
    return $1662971556_$3707265278_mapper(this).slice(start, end)
  },
  sort (fn) {
    return $1662971556_$3707265278_mapper(this).sort(fn)
  },
  reverse (fn) {
    return $1662971556_$3707265278_mapper(this).reverse(fn)
  },
  find (val) {
    const keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      for (let i = 0, len = keys.length; i < len; i++) {
        const r = $1662971556_$2621634261_get(this, keys[i])
        if (val(r, i, this)) return r
      }
    }
  },
  some (val) {
    const keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      for (let i = 0, len = keys.length; i < len; i++) {
        const r = $1662971556_$2621634261_get(this, keys[i])
        if (val(r, i, this)) return true
      }
    }
    return false
  },
  every (val) {
    const keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      for (let i = 0, len = keys.length; i < len; i++) {
        if (!val($1662971556_$2621634261_get(this, keys[i]), i, this)) return false
      }
    }
    return true
  },
  findIndex (val) {
    const keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      for (let i = 0, len = keys.length; i < len; i++) {
        if (val($1662971556_$2621634261_get(this, keys[i]), i, this)) return i
      }
    }
    return -1
  },
  indexOf (val) {
    const keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      for (let i = 0, len = keys.length; i < len; i++) {
        const r = $1662971556_$2621634261_get(this, keys[i])
        if (r.compute() === val || r === val) return i
      }
    }
    return -1
  },
  lastIndexOf (val) {
    const keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      let i = keys.length
      while (i--) {
        const r = $1662971556_$2621634261_get(this, keys[i])
        if (r.compute() === val || r === val) return i
      }
    }
    return -1
  },
  includes (val, index = 0) {
    const keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      for (let len = keys.length, i = index > -1 ? index : Math.max(len + index, 0); i < len; i++) {
        const r = $1662971556_$2621634261_get(this, keys[i])
        if (r.compute() === val || r === val) return true
      }
    }
    return false
  },
  forEach (fn) {
    var keys = $1662971556_$466859286_getKeys(this)
    if (keys) {
      keys = keys.concat()  // bit slow but usefull for remove for example
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i]
        const r = $1662971556_$2621634261_get(this, key)
        if (r) { fn(r, key, this) }
      }
    }
  }
}

;


var $1662971556_$481288723 = struct => {
  if (typeof Symbol !== 'undefined') {
    struct.Constructor.prototype[Symbol.iterator] = function () {
      const keys = $1662971556_$466859286_getKeys(this)
      const t = this
      var i = 0
      return {
        throw: () => {},
        // add handle for removal / change of keys
        next: () => ({
          value: $1662971556_$2621634261_get(t, keys[i++]),
          done: i === keys.length + 1
        })
      }
    }
  }
}

;// dont add this in the browser




const $1662971556_$4025957895_define = {
  inspect () {
    if (this._noInspect_) {
      return this
    }
    var keys = $1662971556_$466859286_getKeys(this)
    var val = this.val
    const p = $1662971556_$1695496138_path(this)
    var type = $1662971556_$2621634261_get(this, 'type').compute()
    const start = type && type[0].toUpperCase() + type.slice(1) + ' ' + (p.length ? `${p.join('.')} ` : '')
    if (val && typeof val === 'object' && val.inherits) {
      val = val.inspect()
    }
    if (keys) {
      if (keys.length > 10) {
        const len = keys.length
        keys = keys.slice(0, 5)
        keys.push('... ' + (len - 5) + ' more items')
      }
      return val
        ? `${start}{ val: ${val}, ${keys.join(', ')} }`
        : `${start}{ ${keys.join(', ')} }`
    } else {
      return val
        ? `${start}{ val: ${val} }`
        : `${start}{ }`
    }
  }
}

var $1662971556_$4025957895 = {
  define: $1662971556_$4025957895_define,
  props: { default: 'self', _noInspect_: true }
}

;














// add puid as default
// never use chain maybe remove it -- lets remove
const $1662971556_$3362410831_chain = (c, t) => c === null || c && c !== true ? c : t

var $1662971556_$3362410831_listenerId = 0

const $1662971556_$3362410831_inject = [ { define: $1662971556_$3707265278 }, $1662971556_$481288723, $1662971556_$4025957895 ]

const $1662971556_$3362410831_define = {
  applyContext (context) { return $1662971556_$2633820941_applyContext(this, context) },
  storeContext () { return $1662971556_$2633820941_storeContext(this) },
  serialize (fn) { return $1662971556_$2664996580(this, fn) },
  root (real) { return $1662971556_$1695496138_root(this, real) },
  path (real) { return $1662971556_$1695496138_path(this, real) },
  parent (fn) {
    if (fn !== void 0) {
      if (typeof fn === 'function') {
        let p = this
        while (p) {
          let result = fn(p)
          if (result) { return result }
          p = $1662971556_$1695496138_parent(p)
        }
      } else {
        let p = this
        while (fn-- && p) { p = $1662971556_$1695496138_parent(p) }
        return p
      }
    } else {
      return $1662971556_$1695496138_parent(this)
    }
  },
  emit (type, val, stamp) {
    if (stamp === void 0) {
      $1662971556_$2092109398_generic(this, type, val, $1662971556_$826337949.create())
      $1662971556_$826337949.close()
    } else {
      $1662971556_$2092109398_generic(this, type, val, stamp)
    }
    return this
  },
  toString () {
    const r = this.compute()
    if (typeof r === 'object' || r === void 0) {
      return ''
    } if (!isNaN(r)) {
      return r + ''
    } else {
      return r
    }
  },
  subscribe (subs, cb, raw, tree) {
    return $1662971556_$3203877739_subscribe(this, !raw ? $1662971556_$3203877739_parse(subs) : subs, cb, tree)
  },
  once (check, callback) {
    return $1662971556_$2030617653(this, check, callback)
  },
  on (type, val, id) {
    if (typeof type === 'function') {
      id = val
      val = type
      type = 'data'
    }
    if (!id) { id = ++$1662971556_$3362410831_listenerId }
    const temp = { on: {} } // problem with bublé cant set [type] : { [id] }
    temp.on[type] = {}
    temp.on[type][id] = val
    return $1662971556_$3362410831_chain($1662971556_$4292174816_set(this, temp), this)
  },
  set: function (val, stamp, reset) { // function fixes buble
    if (stamp === void 0) {
      const ret = $1662971556_$3362410831_chain($1662971556_$4292174816_set(this, val, $1662971556_$826337949.create(), void 0, reset), this)
      $1662971556_$826337949.close()
      return ret
    } else {
      return $1662971556_$3362410831_chain($1662971556_$4292174816_set(this, val, stamp, void 0, reset), this)
    }
  },
  create (val, stamp, reset) { // add all fields here
    if (stamp === void 0) {
      const ret = $1662971556_$4292174816_create(this, val, $1662971556_$826337949.create(), void 0, void 0, reset)
      $1662971556_$826337949.close()
      return ret
    } else {
      return $1662971556_$4292174816_create(this, val, stamp, void 0, void 0, reset)
    }
  },
  // add api as a method perhaps?
  get (key, val, stamp) { return $1662971556_$3815974835(this, key, val, stamp) },
  push (val, stamp) {
    const key = $1662971556_$826337949.create()
    if (stamp === void 0) {
      const ret = $1662971556_$3362410831_chain($1662971556_$4292174816_set(this, { [key]: val }, key), this)[key]
      $1662971556_$826337949.close()
      return ret
    } else {
      return $1662971556_$3362410831_chain($1662971556_$4292174816_set(this, { [key]: val }, stamp), this)[key]
    }
  },
  compute: function (val, passon, arg) { return $1662971556_$958575751_compute(this, val, passon, arg) }, // function fixes buble
  origin () { return $1662971556_$958575751_origin(this) },
  keys () { return $1662971556_$466859286_getKeys(this) || [] }
}

var $1662971556_$3362410831 = { inject: $1662971556_$3362410831_inject, define: $1662971556_$3362410831_define }

;








// // maybe remove cuid




const $1662971556_$3269461964_emitterProperty = $1662971556_$3707563476.props.on.struct.props.default

$1662971556_$4292174816_set($1662971556_$3707563476, { inject: $1662971556_$3362410831 })

const $1662971556_$3269461964_create = (val, stamp, t = $1662971556_$3707563476, parent, key) =>
  $1662971556_$4292174816_create(t, val, stamp, parent, key)


var $1662971556_$3269461964_subscribe = $1662971556_$3203877739_subscribe;var $1662971556_$3269461964_parse = $1662971556_$3203877739_parse;var $1662971556_$3269461964_compute = $1662971556_$958575751_compute;var $1662971556_$3269461964_set = $1662971556_$4292174816_set;var $1662971556_$3269461964_struct = $1662971556_$3707563476;var $1662971556_$3269461964_property = $1662971556_$624523381_property;var $1662971556_$3269461964_contextProperty = $1662971556_$2633820941_contextProperty;var $1662971556_$3269461964_switchInheritance = $1662971556_$2264940719_switchInheritance;var $1662971556_$3269461964_get = $1662971556_$2621634261_get;var $1662971556_$3269461964_getProperty = $1662971556_$624523381_getProp;var $1662971556_$3269461964_getKeys = $1662971556_$466859286_getKeys;var $1662971556_$3269461964_removeContextKey = $1662971556_$466859286_removeContextKey;var $1662971556_$3269461964_addKey = $1662971556_$466859286_addKey;var $1662971556_$3269461964_removeKey = $1662971556_$466859286_removeKey;var $1662971556_$3269461964_getType = $1662971556_$2411079736;var $1662971556_$3269461964_getVal = $1662971556_$2621634261_getVal;var $1662971556_$3269461964_uid = $1662971556_$3258224650_uid;var $1662971556_$3269461964_cuid = $1662971556_$3258224650_cuid;var $1662971556_$3269461964_puid = $1662971556_$3258224650_puid;
var $1662971556_$3269461964_$ALL$ = {
  subscribe: $1662971556_$3203877739_subscribe,
  parse: $1662971556_$3203877739_parse,
  create: $1662971556_$3269461964_create,
  compute: $1662971556_$958575751_compute,
  set: $1662971556_$4292174816_set,
  struct: $1662971556_$3707563476,
  property: $1662971556_$624523381_property,
  contextProperty: $1662971556_$2633820941_contextProperty,
  emitterProperty: $1662971556_$3269461964_emitterProperty,
  switchInheritance: $1662971556_$2264940719_switchInheritance,
  get: $1662971556_$2621634261_get,
  getProperty: $1662971556_$624523381_getProp,
  getKeys: $1662971556_$466859286_getKeys,
  removeContextKey: $1662971556_$466859286_removeContextKey,
  addKey: $1662971556_$466859286_addKey,
  removeKey: $1662971556_$466859286_removeKey,
  getType: $1662971556_$2411079736,
  getVal: $1662971556_$2621634261_getVal,
  uid: $1662971556_$3258224650_uid,
  cuid: $1662971556_$3258224650_cuid,
  puid: $1662971556_$3258224650_puid
}

var $1662971556 = $1662971556_$3269461964_$ALL$
;var $3305006410_exports = {}
/**
 * @function ua
 * Returns an object representing the user agent including data such as browser, device and platform
 * @param {string} _ua - the raw user agent string to be converted
 * @param {string} obj - (optional) object to be merged to the output result
 * @returns {object} object representing your user agent
 */
var $3305006410 = $3305006410_exports = function (_ua, obj) {
  if (!obj) obj = {}
  // _ua = 'webos; linux - large screen'
  var node = 'node.js'
  var _ff = 'firefox'
  var _mac = 'mac'
  var _chrome = 'chrome'
  var _android = 'android'
  var _wrapper = 'wrapper'
  var _mobile = '.+mobile'
  var _webkit = 'webkit'
  var _ps = 'playstation'
  var _xbox = 'xbox'
  var _linux = 'linux'
  var _castDetect = 'crkey'
  var _chromecast = 'cast'
  var _tablet = 'tablet'
  var _windows = 'windows'
  var _phone = 'phone'
  var _firetv = 'firetv'
  var _facebook = 'facebook'
  var _edge = 'edge'
  var _version = 'version'
  var _samsung = 'samsung'

  _ua = typeof _ua === 'string' ? _ua.toLowerCase() : node

  /**
   * browser detection
   */
  test.call(obj, _ua,
    function (query, arr) {
      obj.browser = arr[2] || query
      var _v = _ua.match(
        new RegExp('((([\\/ ]' + _version + '|' + arr[ 0 ] + '(?!.+' + _version + '))[\/ ])| rv:)([0-9]{1,4}\\.[0-9]{0,2})')
      )
      obj[_version] = _v ? Number(_v[4]) : 0
      obj.prefix = arr[1]
      // TODO: add prefix for opera v>12.15;
      // TODO: windows check for ie 11 may be too general;
    },
    [ true, _webkit ],
    [ '\\(' + _windows, 'ms', 'ie' ],
    [ 'safari', _webkit ],
    [ _ff, 'moz' ],
    [ 'opera', 'O' ],
    [ 'msie', 'ms', 'ie' ],
    [ _facebook ],
    [ _chrome + '|crios\/', _webkit, _chrome ],
    [ _edge, _webkit, _edge ],
    [ node, false, true ]
  )

  /**
   * platform detection
   */
  test.call(obj, _ua, 'platform',
    [ true, _windows ],
    [ _linux ],
    [ 'lg.{0,3}netcast', 'lg' ], // TODO:propably need to add more!
    [ _ff + _mobile, _ff ],
    [ _mac + ' os x', _mac ],
    [ 'iphone|ipod|ipad', 'ios' ],
    [ _xbox ],
    [ _ps ],
    [ _android ],
    [ _windows ],
    [ _castDetect, _chromecast ],
    [ 'smart-tv;|;' + _samsung + ';smarttv', _samsung ], // SmartTV2013
    [ node ]
  )

  /**
   * device detection
   */
  test.call(obj, _ua, 'device',
    [ true, 'desktop' ],
    [ _windows + '.+touch|ipad|' + _android, _tablet ],
    [
      _phone + '|phone|(' +
      _android + _mobile + ')|(' + _ff + _mobile +
      ')|' + _windows + ' phone|iemobile', _phone
    ],
    [ _xbox + '|' + _ps, 'console' ],
    [ _castDetect, _chromecast ],
    [ _tablet + '|amazon-fireos|nexus (?=[^1-6])\\d{1,2}', _tablet ],
    [ 'tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast.tv|webos.+large|viera|aft[bsm]|bravia', 'tv' ],
    [ 'mozilla\\/5.0 \\(compatible; .+http:\\/\\/', 'bot' ],
    [ node, 'server' ]
  )

  /**
   * wrapped webview native app detection
   */
  test.call(obj, _ua, 'webview',
    [ true, false ],
    [ 'crosswalk' ],
    [ 'vigour-' + _wrapper, _wrapper ],
    [ 'cordova' ],
    [ 'ploy-native' ]
  )

  return obj

  /**
   * test
   * search for regexps in the userAgent
   * fn is a on succes callback
   * check tests in https://github.com/faisalman/ua-parser-js to test for userAgents
   * @method
   */
  function test (_ua, fn) {
    for (
      var tests = arguments, i = tests.length - 1, t = tests[i], query = t[0];
      query !== true && !new RegExp(query).test(_ua) && i > 0;
      t = tests[--i], query = t[0]
    ); //eslint-disable-line
    // this for has no body
    if (fn.slice || fn.call(this, query, t)) {
      this[fn] = t[1] === void 0 ? query : t[1]
    }
  }
}

;var $1546195150_exports = {}
var $1546195150_$1662971556 = $1662971556
;var $1546195150_$826337949 = $826337949
;

const $1546195150_$1094503762_next = typeof window === 'undefined'
  ? process.nextTick
  : global.requestAnimationFrame

const $1546195150_$1094503762_serialize = (hub, t, struct, val, level) => {
  if (!struct.isHub || struct.key === 'clients' || (struct._p && struct._p.key === 'clients')) {
    return
  }

  const path = struct.path() // cached version (later)
  const len = path.length

  if (struct.val !== void 0 || val === null) {
    var s = t[0] || (t[0] = {})

    for (let i = level; i < len; i++) {
      let t = s[path[i]]
      if (!t) {
        s = s[path[i]] = {}
      } else {
        s = t
        if (s.val === null) { return }
      }
    }

    s.stamp = struct.stamp

    if (val === null) {
      for (let key in s) {
        if (key !== 'stamp') {
          delete s[key]
        }
      }
      s.val = null
    } else if (struct.val && struct.val.inherits) {
      s.val = struct.val.path()
      s.val.unshift('@', 'root')
      $1546195150_$1094503762_serialize(hub, t, struct.val, val, level)
    } else if (struct.val !== void 0) {
      s.val = struct.val
    }
  }
}

const $1546195150_$1094503762_meta = hub => {
  if (!hub.receiveOnly) {
    const store = $1546195150_$1094503762_inProgress(hub, $1546195150_$826337949.inProgress ? $1546195150_$826337949.on : $1546195150_$1094503762_next)
    if (!store[1]) store[1] = {}
    if (hub.context) {
      if (hub.context.keys().length > 0) {
        store[1].context = hub.context.compute() ? hub.context.serialize() : false
      } else {
        store[1].context = hub.context.compute() || false
      }
    }
    store[1].id = hub.client.key
    if (hub.upstreamSubscriptions) {
      store[1].s = Object.keys(hub.upstreamSubscriptions)
    }
  } else if (hub.upstreamSubscriptions) {
    let override
    for (let key in hub.upstreamSubscriptions) {
      if (hub.upstreamSubscriptions[key].__force__) {
        if (!override) override = []
        override.push(key)
      }
    }
    if (override) {
      const store = $1546195150_$1094503762_inProgress(hub, $1546195150_$826337949.inProgress ? $1546195150_$826337949.on : $1546195150_$1094503762_next)
      if (!store[1]) store[1] = {}
      const obj = {}
      let i = override.length
      while (i--) {
        obj[override[i]] = hub.upstreamSubscriptions[override[i]]
      }
      store[1].s = Object.keys(obj)
    }
  }
}

const $1546195150_$1094503762_send = (val, stamp, struct) => {
  let hub
  let p = struct
  while (p) {
    if (p._url_ && !p._c) hub = p
    p = p.parent() // needs to walk over context (for multi server)
  }

  if (hub) {
    if (!hub.receiveOnly) {
      if (struct === hub) {
        if (val === null) {
          return
        }
      } else if (struct._p.key === 'clients') {
        if (struct.key !== hub.client.key) {
          return
        }
      }
      $1546195150_$1094503762_serialize(hub, $1546195150_$1094503762_inProgress(hub, $1546195150_$826337949.on), struct, val, hub.urlIndex)
    }
  }
}

// need to know if created by myself
// else starts correcting wrong stamps
const $1546195150_$1094503762_applyDifference = (val, diff) => {
  for (let key in val) {
    if (typeof val[key] === 'object') {
      $1546195150_$1094503762_applyDifference(val[key], diff)
    } else if (key === 'stamp') {
      val[key] = val[key] + diff
    }
  }
}

const $1546195150_$1094503762_inProgress = (hub, tick) => {
  if (!hub.inProgress) {
    hub.inProgress = []
    tick(() => {
      if (hub.connected.compute() === true) {
        $1546195150_$1094503762_out(hub)
      } else {
        var offset = $1546195150_$826337949.offset
        hub.connected.once(true, () => {
          if ($1546195150_$826337949.offset && Math.abs($1546195150_$826337949.offset - offset) > 1000) {
            $1546195150_$1094503762_applyDifference(hub.inProgress[0], $1546195150_$826337949.offset - offset)
          }
          $1546195150_$1094503762_out(hub)
        })
      }
    })
  }
  return hub.inProgress
}

const $1546195150_$1094503762_out = t => {
  t.socket.send(JSON.stringify(t.inProgress))
  t.inProgress = false
}

const $1546195150_$1094503762_sendSubscriptions = (socket, subs, hub) => {
  let i = subs.length
  const m = {}
  while (i--) {
    const key = subs[i]
    m[key] = hub.upstreamSubscriptions[key]
  }
  const payload = []
  payload[1] = { s: subs, m }
  socket.send(JSON.stringify(payload))
}



var $1546195150_$1094503762_$ALL$ = {
  meta: $1546195150_$1094503762_meta,
  send: $1546195150_$1094503762_send,
  sendSubscriptions: $1546195150_$1094503762_sendSubscriptions
}
;var $1546195150_$1704955210 = global.WebSocket
// if ! native websocket construct a fallback (can use exception builder)

;const $1546195150_$3851780354_isEmpty = t => {
  for (let i in t) { return false }
  return true
}

const $1546195150_$3851780354_parse = (struct, obj, key, root) => {
  const result = {}
  if (!root) { root = result }
  if (obj.type) result.type = $1546195150_$3851780354_parse(struct, obj.type, 'type')
  for (let i in obj) {
    if (i !== '_' && i !== 'type') {
      if (typeof obj[i] === 'function') {
        let val = obj[i].toString()
        if (!/^(function|\()/.test(val)) {
          // this can all be done on the hub itself of course
          // hash will also be used for sec purposes
          // this will just be send up and done on the hub -- not here!

          if (/^.+=>/.test(val)) {
            if (!/^(\(){0, 1}.+(\)){0, 1} +=>/.test(val)) {
              val = val.replace(/^(.*?)( +=>)/, '($1)$2')
            }
            if (!/^(.*?)+=> +{(.*?)}$/.test(val) && val.indexOf('return ') === -1) {
              val = val.replace(/^(.+=> *?)(.*?)/, '$1 { return $2') + ' }'
            }
            val = val.replace('=>', '')
          }
          val = 'function ' + val
        }
        result['$fn|' + i] = val
        // also here we need to rewrite client to use client id
      } else if (typeof obj[i] !== 'object') {
        result[i] = obj[i]
      } else {
        let parsed = $1546195150_$3851780354_parse(struct, obj[i], i, root)
        if (parsed !== void 0) { result[i] = parsed }
      }
    }
  }
  // if result is empty ignore -- may not be a good idea
  return $1546195150_$3851780354_isEmpty(result) ? void 0 : result
}

var $1546195150_$3851780354 = $1546195150_$3851780354_parse

;var $1546195150_$2180032073 = $2180032073
;var $1546195150_$3305006410 = $3305006410
;
const $1546195150_$1384736615_uniq = global.navigator.userAgent +
  global.navigator.userLanguage +
  global.navigator.language
var $1546195150_$1384736615 = () => $1546195150_$2180032073(`b-${Date.now()}-${(Math.random() * 10000) | 0}-${$1546195150_$1384736615_uniq}`)

;


var $1546195150_$2828932010 = (t, val, stamp, useragent, id) => {
  if (!id) id = t._uid_ || $1546195150_$1384736615()
  $1546195150_$3305006410(useragent, val)
  val.ua = useragent || false
  t.set({ clients: { [id]: val } }, stamp)
  return t.clients[id]
}

;var $1546195150_$1385737091 = 1e7 // byteLength -- has to be like 10mb

;

// TODO: implement send

var $1546195150_$2003515468_blobArray = false

const $1546195150_$2003515468_receiveLarge = (data, cb) => {
  if (!$1546195150_$2003515468_blobArray) $1546195150_$2003515468_blobArray = []
  $1546195150_$2003515468_blobArray.push(data)

  if (data.size < $1546195150_$1385737091) {
    let i = $1546195150_$2003515468_blobArray.length
    let done = i
    let stringArray = []

    while (i--) {
      const reader = new FileReader() // eslint-disable-line

      const onLoadEnd = ((i, e) => {
        reader.removeEventListener('loadend', onLoadEnd, false)
        if (!e.error) {
          stringArray[i] = reader.result
          if (--done === 0) cb(stringArray.join(''))
        }
      }).bind(null, i)

      reader.addEventListener('loadend', onLoadEnd, false)
      reader.readAsText($1546195150_$2003515468_blobArray[i])
    }

    $1546195150_$2003515468_blobArray = false
  }
}



var $1546195150_$2003515468_$ALL$ = {
  receiveLarge: $1546195150_$2003515468_receiveLarge
}
;








const $1546195150_$3357289264_isNode = typeof window === 'undefined'

// want to use for upsteream
const $1546195150_$3357289264_next = $1546195150_$3357289264_isNode
  ? fn => setTimeout(fn, 18)
  : global.requestAnimationFrame

// const cancel = isNode
//   ? clearTimeout
//   : global.cancelAnimationFrame

const $1546195150_$3357289264_connect = (hub, url, reconnect) => {
  // use outside function non anon since its slower (according to uws)

  const socket = new $1546195150_$1704955210(url)
  const client = hub.client || $1546195150_$2828932010(hub, {}, false)
  // var inProgress, queue

  hub.set({ client }, false)

  hub.reconnect = null

  const close = () => {
    const stamp = $1546195150_$826337949.create()
    hub.socket = false
    hub.set({ connected: false }, stamp)
    $1546195150_$826337949.close()
    if (!socket.blockReconnect && hub._url_) {
      reconnect = Math.min((reconnect * 1.5), 2000)
      hub.reconnect = setTimeout($1546195150_$3357289264_connect, reconnect, hub, url, reconnect)
    }
  }

  socket.onclose = close

  socket.onerror = $1546195150_$3357289264_isNode ? close : () => socket.close()

  socket.onopen = () => {
    hub.socket = socket
    if (hub.emitters && hub.emitters.incoming) {
      $1546195150_$3357289264_enableIncomingListener(socket, hub)
    }
  }

  socket.onmessage = (data) => {
    data = data.data

    if (
      typeof data !== 'string' &&
      (data instanceof ArrayBuffer ||
        (!$1546195150_$3357289264_isNode &&
          ((('Blob' in global) && data instanceof Blob) || // eslint-disable-line
          (('WebkitBlob' in global) && data instanceof WebkitBlob)) // eslint-disable-line
        )
      )
    ) {
      $1546195150_$2003515468_receiveLarge(data, set)
    // just use array! remove this nonsense
    } else if (data[0] === '#') {
      if (data[1] === '1') {
        // same here
        $1546195150_$1094503762_sendSubscriptions(socket, JSON.parse(data.slice(2)), hub)
      } else {
        // call it events -- emit {} etc
        // need to fix this on send used in phoenix else it breaks
        // [ 1 ] emit: { [type]: [], }
        // [ 1 ] subscriptions: { [type]: [] }
        hub.emit('error', JSON.parse(data.slice(1)))
      }
    } else {
      set(data)
    }
  }

  const set = data => $1546195150_$3357289264_recieve(hub, JSON.parse(data)[0], JSON.parse(data)[1])
}

// raf
const $1546195150_$3357289264_recieve = (hub, data, info) => {
  const stamp = hub._incomingStamp = $1546195150_$826337949.create()
  $1546195150_$826337949.setOffset((info.stamp | 0) - ((stamp | 0) - $1546195150_$826337949.offset))

  if (info && info.connect) {
    hub.set({ connected: true }, $1546195150_$826337949.create())
    $1546195150_$1094503762_meta(hub)
    $1546195150_$826337949.close()
  }
  // hub._receiving =  handle this!
  // this will help /w heavy computation on incoming
  if (data) {
    $1546195150_$3357289264_next(() => {
      const stamp = $1546195150_$826337949.create()
      if (!hub.receiveOnly) {
        hub.receiveOnly = true
        hub.set(data, stamp)
        hub.receiveOnly = null
      } else {
        hub.set(data, stamp)
      }
      $1546195150_$826337949.close()
    })
  }
}

const $1546195150_$3357289264_removeUrl = hub => {
  hub.url = hub._url_ = hub.urlIndex = null
  hub.emitters.set({ data: { url$: null } }, false)
}

const $1546195150_$3357289264_removeSocket = hub => {
  if (hub.reconnect) {
    clearTimeout(hub.reconnect)
    hub.reconnect = null
  }
  if (hub.socket) {
    hub.socket.blockReconnect = true
    hub.socket.close()
  }
  hub.socket = false
}

const $1546195150_$3357289264_url = (hub, val, key, stamp) => {
  hub.on((val, stamp, t) => {
    if (val === null && !t._c && t === hub) {
      hub.subscriptions = []
      $1546195150_$3357289264_removeUrl(hub)
      $1546195150_$3357289264_removeSocket(hub)
    }
  }, 'url$')

  if (!val) val = null
  if ((!hub.url && val) || (hub.url.compute() !== val)) {
    $1546195150_$3357289264_removeSocket(hub)
    if (!val) {
      hub.set({ connected: false }, stamp)
      hub._url_ = null
      if (hub.url) hub.url.set(null, stamp)
    } else {
      if (!hub.url) {
        $1546195150_$1662971556.create({
          on: {
            data: {
              url: (val, stamp, struct) => {
                val = struct.compute()
                if (val) {
                  hub.set({ connected: false }, stamp)
                  let i = -1
                  if (hub.key) i++
                  hub.parent(() => { i++ })
                  hub.urlIndex = i // use this for checks
                  hub._url_ = val
                  $1546195150_$3357289264_connect(hub, val, 50)
                } else {
                  hub._url_ = null
                }
              }
            }
          }
        }, stamp, $1546195150_$1662971556.struct, hub, key)
      }
      if (/^https?/.test(val)) val = val.replace(/^http/, 'ws')
      hub.url.set(val, stamp)
    }
  }
}

const $1546195150_$3357289264_removeClients = (hub, stamp) => {
  const clients = hub.clients
  if (clients && clients.keys().length > 1) {
    clients.forEach((client, key) => {
      if (
        client.val !== null &&
        client !== hub.client
      ) {
        client.set(null, stamp)
        delete clients[key]
      }
    })
  }
}

const $1546195150_$3357289264_connected = {
  type: 'struct',
  on: {
    data: {
      removeClients: (val, stamp, t) => {
        if (t.compute() === false) {
          $1546195150_$3357289264_removeClients(t._p, stamp)
        }
      }
    }
  }
}

const $1546195150_$3357289264_contextStruct = $1546195150_$1662971556.struct.create({
  props: {
    default: {
      on: {
        data: {
          updateParent: (val, stamp, t) => {
            t.parent().emit('data', val, stamp)
          }
        }
      }
    }
  }
})

const $1546195150_$3357289264_contextIsNotEqual = (val, context) => {
  if (val && typeof val === 'object') {
    for (let field in val) {
      if (!context[field] || (context[field].compute && context[field].compute()) !== val[field]) {
        return true
      }
    }
  } else {
    return val !== context.compute()
  }
}

const $1546195150_$3357289264_context = (hub, val, key, stamp) => {
  if ((!hub.context && val) || (hub.context && $1546195150_$3357289264_contextIsNotEqual(val, hub.context))) {
    if (!hub.context) {
      $1546195150_$1662971556.create(val, stamp, $1546195150_$3357289264_contextStruct, hub, key)
    } else {
      $1546195150_$3357289264_removeClients(hub, stamp)
      hub.context.set(val, stamp)
    }
    if (hub.connected && hub.connected.compute() === true) $1546195150_$1094503762_meta(hub)
  }
}

const $1546195150_$3357289264_props = {
  reconnect: true,
  socket: true,
  urlIndex: true,
  upstreamSubscriptions: true,
  receiveOnly: true,
  url: $1546195150_$3357289264_url,
  context: $1546195150_$3357289264_context,
  connected: $1546195150_$3357289264_connected
}

const $1546195150_$3357289264_stub = () => {}

const $1546195150_$3357289264_define = {
  subscribe (subs, cb, raw, tree, forceUpstream) {
    if (!raw) subs = $1546195150_$1662971556.parse(subs)
    if (!this.receiveOnly || forceUpstream) {
      const parsed = $1546195150_$3851780354(this, subs)
      if (parsed) {
        if (forceUpstream) {
          parsed.__force__ = true
        }
        // why not keep it stringified? -- saves lots of speed
        const key = $1546195150_$2180032073(JSON.stringify(parsed))
        if (!this.upstreamSubscriptions) {
          this.upstreamSubscriptions = {}
          this.upstreamSubscriptions[key] = parsed
          if (this.url) $1546195150_$1094503762_meta(this)
        } else if (!this.upstreamSubscriptions[key]) {
          this.upstreamSubscriptions[key] = parsed
          if (this.url) $1546195150_$1094503762_meta(this)
        }
      }
    }
    return $1546195150_$1662971556.subscribe(this, subs, cb || $1546195150_$3357289264_stub, tree)
  }
}

const $1546195150_$3357289264_enableIncomingListener = (socket, hub) => {
  if (!socket.incomingOverride) {
    socket.incomingOverride = true
    const field = typeof window === 'undefined'
      ? 'internalOnMessage'
      : 'onmessage'
    const msg = hub.socket[field]
    socket[field] = (data) => {
      hub.emit('incoming', data)
      msg(data)
    }
  }
}

const $1546195150_$3357289264_on = {
  data: { send: $1546195150_$1094503762_send },
  props: {
    incoming: (t, val, key, stamp) => {
      const hub = t._p
      if (hub.socket) $1546195150_$3357289264_enableIncomingListener(hub.socket, hub)
      return $1546195150_$1662971556.emitterProperty(t, val, key, stamp)
    }
  }
}



var $1546195150_$3357289264_$ALL$ = {
  props: $1546195150_$3357289264_props,
  on: $1546195150_$3357289264_on,
  define: $1546195150_$3357289264_define
}
;var $1546195150_$2549126471 = {
  props: {
    contextKey: true,
    getContext: (t, fn) => {
      t.set({
        define: {
          getContext (key, socket) {
            return fn(key, key => $1546195150_$2549126471_createContext(this, key), this, socket)
          }
        }
      })
    }
  },
  getContext: (key, context) => context(key)
}

const $1546195150_$2549126471_createContext = (hub, val) => {
  var result = $1546195150_$2549126471_find(hub, val)
  if (!result) {
    result = hub.create({ contextKey: val }, false)
  }
  return result
}

const $1546195150_$2549126471_find = (hub, val) => {
  const instances = hub.instances
  if (instances) {
    let i = instances.length
    while (i--) {
      if (instances[i].contextKey === val) return instances[i]
    }
  }
}

;// no server in the browser -- yet
var $1546195150_$899748844 = {}

;




const $1546195150_$4043401927_types = $1546195150_$1662971556.struct.props.types

const $1546195150_$4043401927_hub = $1546195150_$1662971556.create({
  type: 'hub',
  instances: false,
  define: {
    isHub: true,
    listen (port) {
      this.set({ port })
      return this
    },
    connect (url) {
      this.set({ url })
      return this
    }
  },
  props: {
    default: 'self',
    _uid_: (t, val) => { t.set({ define: { _uid_: val } }) },
    types: $1546195150_$4043401927_types.bind(), // to not interfere with struct type
    type: $1546195150_$1662971556.struct.props.type.bind(),
    client: true
  }
})

$1546195150_$4043401927_hub.props.types.struct = $1546195150_$4043401927_hub.create({
  props: { default: $1546195150_$4043401927_types.struct.props.default.bind() }
}, false)

$1546195150_$4043401927_hub.props.types.struct.props.default.struct = $1546195150_$4043401927_hub.props.type.struct = $1546195150_$4043401927_hub

$1546195150_$4043401927_hub.set({
  types: {
    hub: 'self',
    clients: {
      type: 'struct',
      instances: false,
      props: {
        default: $1546195150_$4043401927_hub.create({
          instances: false,
          props: {
            cache: true,
            upstreamSubscriptions: true,
            resolve: true,
            socket: true,
            context: true
          }
        }, false)
      }
    }
  },
  props: {
    clients: (t, val, key, stamp) => {
      if (!t.clients) {
        const clients = $1546195150_$1662971556.getType(t, key)
        t.clients = $1546195150_$1662971556.create(val, stamp, clients, t, key)
      } else {
        $1546195150_$1662971556.set(t.clients, val, stamp)
      }
    }
  },
  inject: [ $1546195150_$899748844, $1546195150_$3357289264_$ALL$, $1546195150_$2549126471 ]
}, false)

$1546195150_$4043401927_hub.types._ks = void 0

var $1546195150_$4043401927 = $1546195150_$4043401927_hub

;
const $1546195150_$3474573222_fn = (val, stamp) => $1546195150_$4043401927.create(val, stamp)
var $1546195150_$3474573222 = $1546195150_$3474573222_fn


var $1546195150 = $1546195150_$3474573222
;var $606729666_Hub = $1546195150
var $606729666_state = $606729666_Hub({ something: {} })
var $606729666_amount = 8e3
// -------------------------
var $606729666_cnt = 0
var $606729666_canvas = document.createElement('canvas')
$606729666_canvas.id = 'canvas'
$606729666_canvas.width = 1000
$606729666_canvas.height = 1000
document.body.style.backgroundColor = 'black'
document.body.appendChild($606729666_canvas)
var $606729666_context = $606729666_canvas.getContext('2d')
var $606729666_dir = 2
$606729666_context.fillStyle = 'white'
// -------------------------
function $606729666_goCanvas () {
  $606729666_context.clearRect(0, 0, $606729666_canvas.width, $606729666_canvas.height)
  $606729666_cnt += $606729666_dir
  if ($606729666_cnt > 2500 || $606729666_cnt < 1) {
    $606729666_dir = -1 * $606729666_dir
  }
  var x = {}
  for (var i = 0; i < $606729666_amount; i++) {
    x[i] = i + $606729666_cnt
  }
  $606729666_state.something.set(x)
  window.requestAnimationFrame($606729666_goCanvas)
}
// -------------------------
function $606729666_listen (target, type, stamp) {
  var val = target.compute()
  var i = target.key
  var x =
    Math.sin(val / 5 + $606729666_cnt / 40) * 300 +
    i * 0.02 + 500 +
    Math.cos(val + $606729666_cnt / (40 - i / 1000)) * 10
  var y =
    Math.cos(val / 10) * 300 +
    i * 0.02 + 400 +
    Math.sin(val + $606729666_cnt / (40 - i / 1000)) * 10
  $606729666_context.fillRect(x, y, 1, 1)
}
// -------------------------
var $606729666_tree = $606729666_state.subscribe({ something: { $any: { val: true } } }, $606729666_listen)
// -------------------------
console.log('TREE', $606729666_tree)
console.log('START ' + $606729666_amount)
$606729666_goCanvas()
;
 })(window, {})