import superagent from 'superagent'

module.exports = {
	get: (params, callback) => {
		superagent
		.get(params)
		.query(null)
		.set('Accept', 'application/json')
		.end((err, response) => {
			if (err) {
				callback(err, null)
				return
			}
            callback(null, response)
		})
	}
}