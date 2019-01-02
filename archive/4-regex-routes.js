const express = require('express');
const app = express();

// The next three routes are all the same, but just use different regex

// app.get(/([a-z]+)-([0-9]+)$/, (request, response, nextHandler) => {
// 	response.send(request.params);
// });

// app.get('/:0-:1', (request, response, nextHandler) => {
// 	response.send(request.params);
// });

app.get('/:id-:tag', (request, response, nextHandler) => {
	response.send(request.params);
});

app.get('/:userId/:action-:where', (request, response, nextHandler) => {
	response.send(request.params);
});

app.listen(
	1337,
	()=> console.log('Web server running on port 1337'),
);