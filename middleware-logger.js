const logger = (options) => (request, response, next) => {
	if (typeof options === 'object'
			&& options != null 
			&& options.enable) {
		console.log(
			'Status Code: ', response.statusCode, 'URL:', request.originalURL,);
	}
	next();
}
module.exports = logger;