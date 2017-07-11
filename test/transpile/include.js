// include a function
const fs = require('fs')
const { join } = require('path')
module.exports = (status, name, val) => {
  if (!status.functions[name]) {
    // tmp needs to be build in in b-boy
    if (!val) val = fs.readFileSync(join(__dirname, 'ui', status.ui.id, name + '.js')).toString()
    status.functions[name] = val
  }
  return status.functions[name]
}
