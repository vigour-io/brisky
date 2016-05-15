####coding style
We're currently using the coding style of [npm](https://www.npmjs.org/doc/misc/npm-coding-style.html).

However, for the sake of readibility, we have a few exceptions:

We do not indent up until de end of a var/field name, but rather start our object on a new line. Also, you are allowed to write an object on a single line, if this is more clear for the reader.

For example, we write:

```
app.set(
{ carousel:new carousel(
  { w: 100
  , h: 300
  , data: 
    [ { css: 'blue' , text: 1 }
    , { css: 'red' , text: 2 }
    , { css: 'yellow' , text: 3 }
    , { css: 'green' , text: 4 }
    , { css: 'orange' , text: 5 }
    ]
  })
})
```
Instead of:
```
app.set({carousel:new carousel({ w: 100
                                , h: 300
                                , data: [ { css: 'blue' 
                                          , text: 1 
                                          }
                                        , { css: 'red' 
                                          , text: 2 
                                          }
                                        , { css: 'yellow' 
                                          , text: 3 
                                          }
                                        , { css: 'green' 
                                          , text: 4 
                                          }
                                        , { css: 'orange' 
                                          , text: 5 
                                          }
                                        ]
                                })
})
```
####docs
There is not a lot here yet but try to create or update docs whenever you can!

####comments
Try to write comments as much as possible in the [JSDocs](http://usejsdoc.org/about-getting-started.html) style.

####tests
We are working on a pretty sweet setup using [testling](https://ci.testling.com/) and [mocha](https://ci.testling.com/guide/mocha) all using [travis-ci](https://travis-ci.org/).

*note test scripts for the front end have to show the difference in processing time between the last commit

####dev-tools
We are currently building a tool called [gaston](https://github.com/vigour-io/gaston) makes it easy to build for different devices and adds a pretty solid watch system to browserify projects.

