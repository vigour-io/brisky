var fs = require('../')
	, outDir = __dirname + '/out'
	, nbErrors = 0
	, n = 100
	, pending = n
	, i

for (i = 0; i < n; i += 1) {
	download(i)
}

function download (i) {
	fs.writeFile(outDir + '/' + i
		, 'http://localhost:8008'
		, {
			encoding: 'utf8'
			, maxTries: 5
			, retryDelayType: 'exp'
			, retryDelay: 100
			, retryOn404: true
			, respectRetryAfter: true
		}
		, function (err) {
			var done = n - pending
			pending -= 1
			if (err) {
				nbErrors += 1
				console.error("Error downloading file", err)
			}
			console.log("Done " + done + "/" + n + " (" + Math.round(100 * done / n) + " %)")
			if (pending === 0) {
				console.log("Done. Errors: ", nbErrors)
			}
		})
}