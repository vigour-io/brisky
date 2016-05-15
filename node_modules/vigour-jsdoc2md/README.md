<!-- VDOC.badges travis; standard; npm -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/jsdoc2md.svg?branch=master)](https://travis-ci.org/vigour-io/jsdoc2md)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-jsdoc2md.svg)](https://badge.fury.io/js/vigour-jsdoc2md)

<!-- VDOC END -->

# jsdoc2md
Converts jsdoc comment blocks to markdown

`npm i vigour-jsdoc2md`

## usage

<!-- VDOC.jsdoc jsdoc2md -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### var markdown = jsdoc2md(jsdoc)

Converts jsdoc comment blocks to markdown
- **jsdoc** (*string*) - the jsdoc comment block to convert

<!-- VDOC END -->

#### example

```javascript
var jsdoc2md = require('vigour-jsdoc2md')
jsdoc2md(`
/**
 * @id jsdoc2md
 * @function jsdoc2md
 * Converts jsdoc comment blocks to markdown
 * @param {string} jsdoc - the jsdoc comment block to convert
 * @param {object} [options] - an object full of options
 * @returns {string} markdown - the resulting markdown
 */`)
```

<p align="center">↓</p>

> #### var markdown = jsdoc2md(jsdoc, [options])
> Converts jsdoc comment blocks to markdown
> - **jsdoc** (*string*) - the jsdoc comment block to convert
> - **[options]** (*object*) - an object full of options
>
> - **returns** (*string*) markdown - the resulting markdown
