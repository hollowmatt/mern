const express = require('express');
const app = express();

app.use((request, response, next) => {
	request.allowed = Reflect.has(request.query, 'allowme');
	next();
});

app.get('/', (request, response, next) => {
	if (request.allowed) {
		response.send('Hello - welcome to the secret place');
	} else {
		response.send('You shall not enter!');
	}
});

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
);