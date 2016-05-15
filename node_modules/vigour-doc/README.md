[![Build Status](https://travis-ci.org/vigour-io/doc.svg?branch=master)](https://travis-ci.org/vigour-io/doc)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-doc.svg)](https://badge.fury.io/js/vigour-doc)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/doc/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/doc?branch=master)

# vigour-doc
A collection of tools to help make great docs with minimal effort

```sh
$ npm install vigour-doc
```

## usage
Opt-in to certain behaviors by including placeholder comments in your `.md` files. Then, run `vdoc` (see [vigour-config docs](https://github.com/vigour-io/config#readme))

```sh
$ vdoc
```

### clean
Cleans the generated content on files. **Important** it's necessary to pass true because of a small bug on [vigour-config](https://github.com/vigour-io/config/issues/18)

```sh
$ vdoc --clean true
```

<a name="plugins">
## [badges]()
```gfm
<!-- VDOC.badges <name>(options); ...  -->
```

- **name** : name of plugin
- **options** : (optional) JSON options for plugin

#### example
*<p align="center">README.md</p>*
```gfm
<!-- VDOC.badges travis; standard; npm -->
```
<p align="center">↓</p>
```gfm
<!-- VDOC.badges travis; standard; npm -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/doc.svg?branch=master)](https://travis-ci.org/vigour-io/doc)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-doc.svg)](https://badge.fury.io/js/vigour-doc)
<!-- VDOC END -->
```

See [vigour-doc-badges](https://github.com/vigour-io/doc-badges) for available badges

## [jsdoc]()
Fetches the jsdoc-style comment block containing `@id <ID>`, converts it to github-flavoured markdown, and replaces the placeholder with the result
```md
<!-- VDOC.jsdoc <ID>  -->
```

- **ID** : Identifier to find the desired comment block

#### example
*<p align="center">lib/start.js</p>*
```javascript
/**
 * @id start
 * @function start
 * Searches the directory recursively and updates any vdoc sections
 */
module.exports = exports = function start () {
```
*<p align="center">README.md</p>*
```gfm
<!-- VDOC.jsdoc start -->
```
<p align="center">↓</p>
```gfm
<!-- VDOC.jsdoc start -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
**function** start
Searches the directory recursively and updates any vdoc sections
<!-- VDOC END -->
```
