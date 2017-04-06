'use strict'
const render = require('../')
const test = require('tape')
const hub = require('hub.js')

test('render',  t => {


  // lets go go go


  /*
  const A = ({ blarx }) => <h1>{blarx}</h1>

  const B = ({ dirty, dweep = 'pink' }) => {
    return <div style={{ color: dweep }}>
      <A blarx={dirty}/>
    </div>
  }
  */

  // start with parsing asts etc in the render fn itself
  // const state

  const state = hub({ hello: true })

  render(B({ dirty: state }), document.documentElement)


  t.end()
})
