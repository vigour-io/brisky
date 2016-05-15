module.exports = exports = (typeof window === 'undefined') ?
	require('./lib/server') :
	require('./lib/client')
