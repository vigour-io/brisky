const { create } = require('brisky-struct')
const { render } = require('./framework')
// ------------------------------------------------
const App = require('jsx.transpiled.js')
// ------------------------------------------------
// components will become objects and map properties
const s = create({ title: 'hello' })

// ------------------------------------------------
const app = render(App, s)
document.body.appendChild(app)