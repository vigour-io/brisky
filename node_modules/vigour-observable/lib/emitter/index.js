'use strict'
var Base = require('vigour-base')

/**
 * @namespace Emitter
 * @class
 * @augments base
 * @param {*} val
 *  difference with base -- sets listeners for each key
 *  if there is a function will set a listener on fn val
 * @return {base}
 */
module.exports = new Base({
  inject: [
    require('./storage'),
    require('./trigger'),
    require('./off'),
    require('./on'),
    require('./once'),
    require('./emit'),
    require('./dataStorage'),
    require('./condition')
  ],
  properties: {
    onRemoveProperty: true, // this is a dirty hack still.... remove it later
    emitInstances: { val: true }, // hmm maybe just dont even address this dont use it now
    emitContexts: { val: true } // now we need to check what about making a non context trigger only? that way you keep it save and sound
  },
  useVal: true
}).Constructor
