const express = require('express');
const app = express();

app.get('*', (request, response, next) => {
	response.send('Hello');
});

app.listen(
	1337,
	() => console.log('Web server running on port 1337'),
);