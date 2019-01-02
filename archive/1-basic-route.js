const express = require('express');
const app = express();

app.get('/', (request, response, nextHandler) => {
	response.status(200).send('hello from ExpressJS');
});

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
);