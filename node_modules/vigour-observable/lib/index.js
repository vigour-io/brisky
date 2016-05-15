'use strict'
var Observable = require('./observable')
Observable.prototype.inject(require('./operator/all'))
module.exports = Observable