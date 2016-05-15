# Coveralls

## Dependencies
  - coveralls
  - istanbul
  - tap-spec
  - tape

## Scripts
  - **Tape** example (vigour-io/ua/package.json):

```json
"scripts": {
  "test": "NODE_ENV=test node test/index.js | tap-spec",
  "cover": "istanbul cover --report none --print detail test/index.js",
  "view-cover": "istanbul report html && open ./coverage/index.html",
  "travis": "npm run cover -s && istanbul report lcov && ((cat coverage/lcov.info | coveralls) || exit 0)"
},
```

  - **Mocha** example (from vigour-io/vpack/package.json):

```json
"scripts": {
  "lint": "./node_modules/.bin/eslint . --ignore-path .gitignore",
  "test": "npm run lint; ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec spec/index.js",
  "test-watch": "./node_modules/.bin/mocha spec/index.js -w",
  "prepublish": "npm run lint; npm run test;",
  "coveralls": "cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js"
},
```

## Travis (.travis.yml)
example of `.travis.yml` file configuration (from vigour-io/ua)

```yml
language: node_js
node_js:
  - '5.4'
  - '4.4'
notifications:
  email: false
script: npm run travis
branches:
  except:
    - /^v[0-9]/
  only:
    - master
    - develop
```