const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan('dev'));

app.get('*', (request, response, next) => {
	response.send('Hello from Morgan Stanley');
});

app.listen(
	1337,
	() => console.log("Web Server running on port 1337"),
);