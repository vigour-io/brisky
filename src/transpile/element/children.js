const { getListeners } = require('./subscription')
const { createPropFromExpression } = require('./expression')
const { string, merge } = require('../util')

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

const parseExpressionContainer = (status, node) => {
  if (node.type === 'JSXExpressionContainer') {
    const prop = createPropFromExpression(status, node.expression)
    // props types: struct, raw, reference
    // also need to take status path into account for subscriptions
    if (prop.type === 'struct') {
      const listeners = getListeners(status, 'new')
      // status from current subs path
      // most simple

      // RESUSE -- also not good enough
      // need to check relative subs paths also need to add those when making a prop
      let subs = status.subs
      for (let i = 0, len = prop.val.length; i < len; i++) {
        const key = prop.val[i]
        if (!subs[key]) {
          subs[key] = {}
        }
        subs = subs[key]
      }
      if (!subs.val || subs.val !== true) {
        subs.val = string('shallow')
      }
      const updateListeners = getListeners(merge(
        status,
        {
          subs,
          path: prop.val // not enough of course
        }
      ), 'update')
      // REUSE
      // default value === '' since we use it as text here...
      // remove needs to be handled seperately -- then it will become an empty string as well
      const id = ++status.id
      let newValue, updateValue
      if (prop.expression.type === 'inline') {
        // reuse of computes etc
        newValue = prop.expression.val.replace(
          new RegExp(prop.key, 'g'),
          prop.val.length === 1
            ? `s.get(${prop.val.map(string).join(',')}, '').compute()`
            : `s.get([${prop.val.map(string).join(',')}], '').compute()`
        )
        // this is too simplistic only make the var one time then re-use
        updateValue = prop.expression.val.replace(new RegExp(prop.key, 'g'), 's.compute()')
      }
      const parentId = node.parent.openingElement.id
      const line = status.ui.createText(status, id, parentId, newValue, listeners)
      if (line) listeners.push(line)
      const line2 = status.ui.updateText(status, id, parentId, updateValue, updateListeners)
      if (line2) updateListeners.push(line2)
    } else if (prop.type === 'raw') {

    } else if (prop.type === 'child') {

    } else if (prop.type === 'reference') {

    }
  }
}

exports.parseExpressionContainer = parseExpressionContainer
exports.plainText = plainText
