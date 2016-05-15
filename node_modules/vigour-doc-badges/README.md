<!-- VDOC.badges travis; standard; npm -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/doc-badges.svg?branch=master)](https://travis-ci.org/vigour-io/doc-badges)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-doc-badges.svg)](https://badge.fury.io/js/vigour-doc-badges)
<!-- VDOC END -->
# doc-badges
Generates `.md` badges

`$ npm install vigour-doc-badges`

## usage

```javascript
var badges = require('vigour-doc-badges')
badges(<options>) // returns markdown for the requested badges
```

`<options>` is an object with keys corresponding to badge names (see [available badges](#available-badges)) and values the configuration for the badge

#### example

```javascript
var badges = require('vigour-doc-badges')
badges({
  travis: {
    owner: 'vigour-io',
    repo: 'doc-badges'
  },
  standard: {
    style: 'shield'
  },
  npm: {}
})
/*
[![Build Status](https://travis-ci.org/vigour-io/doc-badges.svg?branch=master)](https://travis-ci.org/vigour-io/doc-badges)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-doc-badges.svg)](https://badge.fury.io/js/vigour-doc-badges)
*/
```

## Available badges

### travis
```javascript
var options = {
  owner: '<githubOwner>',
  repo: '<githubRepo>',
  branch: '<branchName>'
}
```
- **owner** : GitHub owner name
- **repo** : GitHub repository name
- **branch** : GitHub branch name

### standard
```javascript
var options = {
  style: '<style>'
}
```
- **style** : one of the following, defaults to `'shield'`
  * `'shield'`: ![js-standard-style: shield](https://img.shields.io/badge/code%20style-standard-brightgreen.svg "js-standard-style: shield")
  * `'badge'`: ![js-standard-style: badge](https://cdn.rawgit.com/feross/standard/master/badge.svg "js-standard-style: badge")


### npm
```javascript
var options = {
  package: '<packageName>'
}
```
- **package** : npm package name

### ...
more coming soon, stay tuned!
