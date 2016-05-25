# brisky
<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/brisky.svg?branch=master)](https://travis-ci.org/vigour-io/brisky)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky.svg)](https://badge.fury.io/js/brisky)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky?branch=master)

<!-- VDOC END -->
Brisky is a lightning fast js library for building state driven user interfaces.

## examples
Find and create examples on [our example repo](https://github.com/vigour-io/brisky-examples). A simple introduction:

```js
const render = require('brisky/render')

const elem = {
  $: 'person',
  foo: {
    text: {
      $: 'name'
    }
  },
  bar: {
    text: {
      $: 'age'
    }
  }
}

const state = {
  person: {
    name: "John"
    age: 24
  }
}

document.appendchild(render(element, state))
```
