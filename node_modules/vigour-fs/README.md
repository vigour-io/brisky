# vigour-fs

node's [`fs`](https://nodejs.org/api/fs.html) module with sugar on top + [native support](#user-content-supported-platforms).

This document describes only the sugar. For the meat and potatoes, refer to [the nodejs docs](https://nodejs.org/api/fs.html).

## Versioning

This module respects the [semver](http://semver.org/) versioning methodology

## Installation

`npm install vigour-fs`

## Usage

Same as node's `fs` module, e.g.

```javascript
var fs = require('vigour-fs');

fs.readFile('somefile.txt', 'utf8', function(err, data) {
  console.log(data, err)
})
```

## Modification to node's `fs` "API"

All methods provided in `vigour-fs` that also exist in `fs` should behave exactly the same, except for these extra features:

<a name="mkdirp-option"></a>
- ### mkdirp option

`fs.writeFile` accepts a `mkdirp` option, which will create any missing subdirectories

```javascript
fs.writeFile("path/with/inexistent/subdirectories/file.txt"
, "Hello World"
, { mkdirp: true }
, function (err) {
  if (!err) {
    console.log("File will be written to specified path, with subdirectories created as needed")
  }
})
```

- ### read from URL

`fs.readFile` and `fs.writeFile` can accept a URL as path, in which case they will perform a GET request to that url.

```javascript
fs.readFile('http://perdu.com', 'utf8', function (err, data) {
  if (!err) {
    console.log("html from perdu.com", data)
  }
})
```

```javascript
fs.writeFile('perdu.html', 'http://perdu.com', 'utf8', function (err) {
  if (!err) {
    console.log("perdu.html now contains the html from perdu.com")
  }
})
```

This means `fs.readFile` and `fs.writeFile` come with extra options.

Option | Possible values | Default | Description
---|---|---|---
url | <ul><li>`true`</li><li>`false`</li></ul> | `true` | Whether to treat *path* as a url. If false, treats *path* as a local file path. Otherwise, treats *path* as a url if and only if it starts with `http://` or `https://`
followRedirects | <ul><li>`true`</li><li>`false`</li></ul> | `true` | Whether to follow redirects (301, 302, 303, 305, 307, 308)
maxTries | *Positive integer above 0* | `1` | Number of attempts to make in total. If over 1, will retry the request if the response's status code is 500 or 503. Use the [`retryOn404`](#user-content-readFile-retryOn404) option to retry on 404 as well (not recommended).
<a name='readFile-retryDelay'></a>retryDelay | *Positive integer*  | `500` | Time to wait before retrying the first time, in milliseconds. Subsequent attempts may use a different delay, dependant on the [`retryDelayType`](#user-content-readFile-retryDelayType) option. The delay may also be given by a 'retry-after' header accompanying a 503 response (see the [`respectRetryAfter`](#user-content-readFile-respectRetryAfter) option). In any case, the delay is capped by the [`maxRetryDelay`](#user-content-readFile-maxRetryDelay) option.
<a name='readFile-retryDelayType'></a>retryDelayType | <ul><li>`exp`</li><li>`linear`</li><li>`constant`</li></ul> | `exp` | Time to wait before retrying, in milliseconds, as a function of the attempt number (`tryNb`) and the original delay (`retryDelay`) specified in the [`retryDelay`](#user-content-readFile-retryDelay) option <dl><dt>exp</dt><dd>`retryDelay * 2 ^ tryNb`</dd><dt>linear</dt><dd>`retryDelay * tryNb`</dd><dt>*anything else*</dt><dd>`retryDelay`</dd></dl>
<a name='readFile-respectRetryAfter'></a>respectRetryAfter | <ul><li>`true`</li><li>`false`</li></ul> | `true` | Whether to respect the delay provided in a `retry-after` header when receiving a 503 response. True will respect the received delay, false will ignore it and use the [`retryDelayType`](#user-content-readFile-retryDelayType) and [`retryDelay`](#user-content-readFile-retryDelay) options to determine the delay. In any case, the delay is capped by the [`maxRetryDelay`](#user-content-readFile-maxRetryDelay) option.
<a name='readFile-maxRetryDelay'></a>maxRetryDelay | *Positive integer above 0* | `60000` | Maximum time to wait before retrying, in milliseconds. Overrides Retry-After response-headers (see the [`respectRetryAfter`](#user-content-readFile-respectRetryAfter)) option and normal retry delay increments (see the [`retryDelay`](#user-content-readFile-retryDelay)) option.
<a name='readFile-retryOn404'></a>retryOn404 | <ul><li>`true`</li><li>`false`</li></ul> | `false` | Whether to retry when response status code is 404. This looks stupid, and most of the time it will be. It is recommended to leave the default in for this one.

### Examples
```javascript
fs.readFile('http://perdu.com'
  , {
    encoding: 'utf8'
    , maxTries: 5
    , retryDelayType: 'exp'
    , retryDelay: 100
    , retryOn404: true
    , respectRetryAfter: true
  }
  , function(err, str) {
    if (!err) {
      console.log('Contents:', str)
    }
  })
```


```javascript
fs.writeFile('file.txt'
  , 'http://perdu.com'
  , {
    encoding: 'utf8'
    , maxTries: 5
    , retryDelayType: 'exp'
    , retryDelay: 100
    , retryOn404: true
    , respectRetryAfter: true
  }
  , function(err) {
    if (!err) {
      console.log("file.txt now contains the html from perdu.com")
    }
  })
```

```javascript
fs.writeFile('file.txt'
  ,'http://perdu.com'
  , { url: false }
  , function(err) {
    if (!err) {
      console.log('file.txt now contains the string "http://perdu.com"')
    }
  })
```

## New methods

### fs.remove( *path*, *callback* )
Remove a file or directory recursively


Argument | Type | Description
---|---|---
path | String | path
callback | function (err) |  Callback

```javascript
fs.remove('someDirectory', function(err) {
  if (!err) {
    console.log('success!')
  }
})

fs.remove('someFile.txt', function(err) {
  if (!err) {
    console.log('success!')
  }
})
```

### fs.mkdirp( *path*, [ *options* ], *callback*)
Create any necessary subdirectories to allow *path* to exist. Also see `fs.writeFile`'s [mkdirp option](#user-content-mkdirp-option).

Argument | Type | Default | Description
------ | ---- | ------- | -----------
path | String | |  path to create
options | Mode | 0777 |
callback | function (err) | |  Callback

```javascript
fs.mkdirp('path/with/inexistent/subdirectories', function (err) {
  if (!err) {
    console.log("All subdirectories have been created")
  }
})
```

### fs.readJSON( *path*, [ *options* ], *callback*)
Reads a file and `JSON.parse`s it

```javascript
fs.readJSON('somefile.json', function (err, obj) {
  if (!err) {
      console.log(obj.key)
  }
})
```

### fs.writeJSON( *path*, *data*, [ *options* ], *callback*)
`JSON.stringify`s *data* and writes the resulting string to *path*

```javascript
fs.writeJSON('somefile.json', { key: 'value' }, function (err) {
  if (!err) {
    console.log('somefile.json contains `{"key":"value"}`')
  }
})
```

### fs.editJSON( *path*, *fn*, [ *options* ], *callback*)
Reads the file found at *path*, `JSON.parse`s it, passes the result as a single parameter to *fn*, `JSON.stringify`s whatever *fn* returns, saves the resulting string to that same file and calls *callback*.

```javascript
fs.editJSON('somefile.json'
, function (obj) {
  obj.x += 1
  return obj
}
, function (err) {
  if (!err) {
    console.log("done")
  }
})
```

*fn* can also return a promise

```javascript
var Promise = require('promise')
fs.editJSON('somefile.json'
, function (obj) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      obj.x += 1
      resolve(obj)
    }, 500)
  })
}
, function (err) {
  if (!err) {
    console.log("done")
  }
})
```

## Native only

### fs.rootDir
Root directory of the filesystem

```javascript
console.log(fs.rootDir)
```

<a name='supported-platforms'></a>
## Supported platforms

platform | support
---|---
node | full
iOS | partial
Android | partial
Windows Phone | partial
other | none

<a name='native-methods'></a>
## Supported on native

- `fs.readFile`
- `fs.writeFile`
- `fs.readdir`
- `fs.mkdir`
- `fs.rmdir`
- `fs.rename`
- `fs.unlink`
- `fs.exists`
- `fs.stat` (Only supports creation date, modification date and accessed date, all of which are [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects)
- `fs.remove`

## Internals

- `vigour-fs` is based on [`graceful-fs`](https://github.com/isaacs/node-graceful-fs)
- `fs.mkdirp` and the `mkdirp` option available on `fw.writeFile` and `fs.writeJSON` use [node-mkdirp](https://github.com/substack/node-mkdirp)) internally
- `fs.remove` uses [rimraf](https://github.com/isaacs/rimraf) internally

## License

  ISC
