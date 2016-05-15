var express = require('express')
	, app = express()
	, port = 8008

app.use(function (req, res, next) {
	var breaks = Math.random() > 0.5
	if (breaks) {
		
	} else {
		res.end("Done")	
	}
})

app.listen(port)
console.log('Listening on port', port)