const express = require('express');
const app = express();
const debug = require('debug')('debugging');

app.get('*', (request, response, next) => {
	debug('Request:', request.originalUrl);
	response.send('Hello');
});

app.listen(
	1337,
	() => console.log('Web server running on port 1337'),
);