'use strict'

module.exports = function (property, bind, event, emitter, data) {
  if (property[2]) {
    // this is super slow find a better solution e.g. use es6 args
    property[0].apply(
      bind,
      [ data, event ].concat(property[2])
    )
  } else {
    property[0].call(bind, data, event, property[1])
  }
}
