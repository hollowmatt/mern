const express = require('express');
const app = express();

app.get('/one', (request, response, nextHandler) => {
	response.type('text/plain');
	response.write('hello ');
	nextHandler();
});

app.get('/one', (request, response, nextHandler) => {
	response.status(200).end('World!');
});

app.get('/two', (request, response, nextHandler) => {
	response.type('text/plain');
	response.write('hello ');
	nextHandler();
},
(request, response, nextHandler) => {
	response.status(200).end('Moon!');
});

app.listen(
	1337,
	()=> console.log('Web server running on port 1337'),
);