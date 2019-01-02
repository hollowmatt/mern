const express = require("express");
const morgan = require("morgan");
const vhost = require("vhost");
const app = express();

const users = express.Router();
users.use(morgan('dev'));

users.get('/', (request, response, next) => {
	const username = request
		.vhost[0]
		.split('-')
		.map(name => (
			name[0].toUpperCase() +
			name.slice(1)
			))
		.join(' ');
	response.send(`Hello, ${username}`);
});

app.use(vhost('*.localhost', users));

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
);