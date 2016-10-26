# brisky
<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/brisky.svg?branch=master)](https://travis-ci.org/vigour-io/brisky)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky.svg)](https://badge.fury.io/js/brisky)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky?branch=master)

<!-- VDOC END -->
Brisky is a lightning fast universal js library for building state driven user interfaces.

It consist of multiple sub-modules, each module adding specific funcitonality
- [brisky-events](https://github.com/vigour-io/brisky-events)
- [brisky-class](https://github.com/vigour-io/brisky-class)
- [brisky-style](https://github.com/vigour-io/brisky-style)
- [brisky-props](https://github.com/vigour-io/brisky-props)
- [brisky-focus](https://github.com/vigour-io/brisky-focus)
- [brisky-core](https://github.com/vigour-io/brisky-core)

## Examples
Find and create examples on [our example repo](https://github.com/vigour-io/brisky-examples). A simple introduction:

#### Simple

Here we are setting the state `object`, containing `hello` and `world`. In the element we subscribe to that `state` object, taking the `hello` and `world` and displaying them.

Notice that the object can be named anything, as long as you camelCase it, just like a normal JavaScript object. In this example `container1` and `container2` is used.

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({
  object: {
    hello: 'Hello',
    world: 'World!'
  }
})

const element = {
  $: 'object',
  container1: {
    text: {
      $: 'hello'
    }
  },
  container2: {
    text: {
      $: 'world'
    }
  }
}

document.body.appendChild(render(element, state))
```

#### The `tag` field

The tag allows you to render normal DOM elements on your page. By default, every object you render to the DOM is a `div`. You change this by defining a `tag` type, e.g. `tag: 'section'`.

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({})

const element = {
  title: {
    tag: 'h1',
    text: 'I am a title'
  },
  paragraph: {
    tag: 'p',
    text: 'I am a paragraph'
  },
  canvas: {
    tag: 'canvas',
    text: 'I am a canvas',
    props: {
      id: 'canvas',
      width: '150',
      height: '150'
    }
  }
}

document.body.appendChild(render(element, state))
```


#### Modifying state

In this example we have an input field that overwrites state when enter is pressed.

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({
  username: 'John Doe'
})

const element = {
  input: {
    tag: 'input',
    props: { placeholder: 'Enter username' },
    on: {
      enter: (e, stamp) => {
        e.state.root.set({ username: e.target.value }, stamp)
        e.target.value = '' // Reset input field
      }
    }
  }
}

document.body.appendChild(render(element, state))
```


#### Using normal JavaScript inside Brisky

In this example we have a DOM element with a 'current-time' class, displaying the time when in hours and minutes. Notice that a function can be hoisted outside the scope - this is just normal JS.

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({})

const element = {
  currentTime: {
    class: 'current-time',
    text: {
      $transform: data => {
        const time = new Date().getTime();
        const hours = formatTime(time.getHours())
        const minutes = formatTime(time.getMinutes())

        return `${hours}:${minutes}`
      }
    }
  }
}

function formatTime (value) {
  return (value < 10 ? `0${value}` : value)
}

document.body.appendChild(render(element, state))
```

#### The `test` field

Good practice entails not rendering something that isn't needed for the user. Brisky facilitates this by giving you the `test` field.

Here we only render `donaldsSecretPalace` if the username is `Donald`

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({
  username: 'Donald'
})

const element = {
  donaldsSecretPalace: {
    $: '$test',
    $test: state => {
      const username = state.root.username.compute()
      if (username === 'Donald') {
        return true
      }
      return false
    },
    contentInsideBobsPalace: {
      text: 'Secret message for Donald'
    }
  }
}

document.body.appendChild(render(element, state))
```

To extend from this, you can subscribe to test multiple things in the state. A normal use-case could be when you subscribe to something specific, like we do here:

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({
  username: 'Donald',
  otherSecretChangingContent: 'Lorem ipsum'
})

const element = {
  donaldsSecretPalace: {
    $: 'username.$test',
    $test: {
      val: state => {
        const username = state.root.username.compute()
        if (username === 'Donald') {
          return true
        }
        return false
      },
      $: {
        $root: { otherSecretChangingContent: true }
      }
    },
    contentInsideBobsPalace: {
      text: 'Secret message for Donald'
    }
  }
}

document.body.appendChild(render(element, state))
```

#### The `switch` field

A switcher simply switches out the content, based on the value it is subscribing to.

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({
  current: 'home'
})

const element = {
  $: 'current.$switch',
  $switch: state => state.compute() ? 'home' : 'profile',
  properties: {
    home,
    profile
  }
}

const home = {
  text: 'This is the default page'
}

const profile = {
  text: 'This is the profile page'
}

document.body.appendChild(render(element, state))
```

#### The `fragment` field

```js
const render = require('brisky/render')
const s = require('vigour-state/s')

const state = s({})

const element = {
  container: {
    tag: 'fragment'
  }
}

document.body.appendChild(render(element, state))
```