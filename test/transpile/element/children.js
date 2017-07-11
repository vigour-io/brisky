const { getListeners } = require('./subscription')
const { createPropFromExpression } = require('./expression')
const { string, merge } = require('../util')

// const addToSubscription = () => {

// }

const parseExpressionContainer = (status, node) => {
  if (node.type === 'JSXExpressionContainer') {
    const prop = createPropFromExpression(status, node.expression)
    // props types: struct, raw, reference
    // also need to take status path into account for subscriptions
    if (prop.type === 'struct') {
      const listeners = getListeners(status, 'new')

      // status from current subs path
      // most simple
      //
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

      const id = ++status.id
      let newValue, updateValue
      if (prop.expression.type === 'inline') {
        newValue = prop.expression.val.replace(
          new RegExp(prop.key, 'g'),
          `s.get([${prop.val.map(string).join(',')}, 'compute'])`
        )
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
