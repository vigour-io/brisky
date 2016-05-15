var fs = require('../../lib/server')

fs.readFile('/dev/stdin', function (err, data) {
	if (err) {
		throw err
	}
	process.stdout.write(data)
})