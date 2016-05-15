var testServer = require('../testServer.js')
	, readPort = 8000
  , writePort = 8001

testServer('read', readPort)
testServer('write', writePort)