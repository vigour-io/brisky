'use strict'

exports.properties = {
  storeData: { val: true },
  _dataStorage: true
}

// make make make
exports.define = {
  storeData (data, event, bind) {
    if (!this.hasOwnProperty('_dataStorage')) {
      this._dataStorage = {}
    }
    let eventstore = this._dataStorage[event.stamp]
    if (!this._dataStorage[event.stamp]) {
      this._dataStorage[event.stamp] = eventstore = {}
    }
    eventstore[bind.uid] = data
    return eventstore
  },
  getData (event, bind) {
    var ds = this._dataStorage
    return ds && ds[event.stamp] && ds[event.stamp][bind.uid]
  }
}

// clearing it --- LATER
