const chalk = require('chalk')

const walker = (node, parse, parent) => {
  if (parent) node.parent = parent
  if (!parse(node)) {
    const keys = Object.keys(node)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (key === 'parent') continue
      let child = node[key]
      if (Array.isArray(child)) {
        for (let j = 0; j < child.length; j++) {
          let c = child[j]
          if (c && typeof c.type === 'string') walker(c, parse, node)
        }
      } else if (key !== 'elem' && child && typeof child.type === 'string') {
        walker(child, parse, node)
      }
    }
  }
}

const showcode = (str, start, end) => { // eslint-disable-line
  if (typeof start === 'object') {
    if (start.end) {
      showcode(str, start.start, start.end)
    } else {
      for (let i in start) {
        showcode(str, start[i].start, start[i].end)
      }
    }
  } else {
    console.log(
      chalk.blue(str.slice(start - 50 > 0 ? start - 50 : 0, start)) +
      chalk.green(str.slice(start, end)) +
      chalk.blue(str.slice(end, end + 50 > str.length ? str.length : end + 50))
    )
  }
}

const assembleFunctions = subs => {
  if (subs._) {
    for (let fn in subs._) {
      var parsed
      if (fn === 'new') {
        parsed = `(s, type, subs, tree) => { \nif (!tree._) tree._ = {}\n`
      } else {
        parsed = `(s, type, subs, tree) => { \n`
      }
      subs._[fn] = parsed + subs._[fn].join('\n') + '\n }'
    }
  }

  for (let key in subs) {
    if (typeof subs[key] === 'object' && key !== '_') {
      assembleFunctions(subs[key])
    }
  }
}

const hasArg = (str, args) => {
  for (let i = 0; i < args.length; i++) {
    if (args[i].key === str) {
      return args[i]
    }
  }
  return false
}

exports.showcode = showcode
exports.walker = walker
exports.hasArg = hasArg
exports.assembleFunctions = assembleFunctions

