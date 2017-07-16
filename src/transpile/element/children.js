const { getListeners } = require('./subscription')
const { createPropFromExpression } = require('./expression')
const { string, merge, resolvePath } = require('../util')

const plainText = (status, node) => {
  if (node.type === 'Literal' && node.parent.type === 'JSXElement') {
    const listeners = getListeners(status, 'new')
    const line = status.ui.createText(
        status,
        false,
        node.parent.openingElement.id,
        string(node.value)
      )
    if (line) listeners.push(line)
  }
}

const createSubs = (subs, prop) => {
  for (let i = 0, len = prop.val.length; i < len; i++) {
    const key = prop.val[i]
    if (!subs[key]) subs[key] = {}
    subs = subs[key]
  }
  if (!subs.val || subs.val !== true) subs.val = string('shallow')
  return subs
}

const parseSingleStruct = (status, node, prop) => {
  const listeners = getListeners(status, 'new')
  const subs = createSubs(status.subs, prop)
  const updateListeners = getListeners(merge(
    status, { subs, path: prop.val }
  ), 'update')
  const id = ++status.id
  let newValue, updateValue
  if (prop.expression.type === 'inline') {
    const replacementKey = prop.expression.replacementKey
    newValue = prop.expression.val.replace(
      new RegExp(replacementKey, 'g'),
      prop.val.length === 0
        ? 'state.compute()'
        : prop.val.length === 1
          ? `state.get(${prop.val.map(string).join(',')}, '').compute()`
          : `state.get([${prop.val.map(string).join(',')}], '').compute()`
    )
    updateValue = prop.expression.val.replace(new RegExp(replacementKey, 'g'), 'state.compute()')
  }
  const parentId = node.parent.openingElement.id // bit lame to put id in opening element....
  const line = status.ui.createText(status, id, parentId, newValue, listeners)
  if (line) listeners.push(line)
  const line2 = status.ui.updateText(status, id, parentId, updateValue, prop.val, updateListeners)
  if (line2) updateListeners.push(line2)
}

const parseExpressionContainer = (status, node) => {
  if (node.type === 'JSXExpressionContainer') {
    const prop = createPropFromExpression(status, node.expression)
    if (prop.type === 'struct') {
      parseSingleStruct(status, node, prop)
    } else if (prop.type === 'raw') {

    } else if (prop.type === 'child') {

    } else if (prop.type === 'group') {
      const id = ++status.id
      const parentId = node.parent.openingElement.id // bit lame to put id in opening element....
      if (prop.expression.type === 'inline') {
        const listeners = getListeners(status, 'new')
        let i = prop.expression.replacementKey.length
        var newValue = prop.expression.val
        while (i--) {
          const replacementKey = prop.expression.replacementKey[i]
          const target = prop.val[replacementKey]
          if (target.type === 'struct') {
            const path = target.val
            newValue = newValue.replace(
              new RegExp(replacementKey, 'g'),
              target.val.length === 0
                ? 'state.compute()'
                : target.val.length === 1
                  ? `state.get(${target.val.map(string).join(',')}, '').compute()`
                  : `state.get([${target.val.map(string).join(',')}], '').compute()`
            )
            const subs = createSubs(status.subs, target)
            const updateListeners = getListeners(merge(
                status, { subs, path: path.val }
              ), 'update')

            let updateValue = prop.expression.val.replace(new RegExp(replacementKey, 'g'), 'state.compute()')
            let j = prop.expression.replacementKey.length
            while (j--) {
              if (j !== i) {
                const key = prop.expression.replacementKey[j]
                const relativeTarget = prop.val[key]
                const val = `state${resolvePath(path, relativeTarget.val)}.compute()`
                updateValue = updateValue.replace(new RegExp(key, 'g'), val)
              }
            }
            const line2 = status.ui.updateText(status, id, parentId, updateValue, target.val, updateListeners)
            if (line2) updateListeners.push(line2)
          }
        }
        const line = status.ui.createText(status, id, parentId, newValue, listeners)
        if (line) listeners.push(line)
      }
    }
  }
}

exports.parseExpressionContainer = parseExpressionContainer
exports.plainText = plainText
