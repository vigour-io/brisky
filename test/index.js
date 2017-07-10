const { create } = require('brisky-struct')
const { render } = require('./framework')

const App = require('./jsx.transpiled.real.js')

const state = create({
  title: 'hello',
  flups: 'w0000t'
})

const tree = {}

// console.log(App)
state.subscribe(App, render, false, tree)

// console.log(tree)
document.body.appendChild(tree._[1])

setTimeout(() => {
  state.set({
    title: 'woooow'
  })
}, 1500)
