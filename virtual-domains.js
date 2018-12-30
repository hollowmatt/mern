const express = require("express");
const morgan = require("morgan");
const vhost = require("vhost");
const app = express();

const app1 = express.Router();
const app2 = express.Router();
app1.use(morgan('dev'));
app2.use(morgan('dev'));

app1.get('/', (request, response, next) => {
	response.send("This is the main application - app 1");
});

app2.get('/', (request, response, next) => {
	response.send("this is the secondary application - app 2");
});

app.use(vhost('localhost', app1));
app.use(vhost('second.localhost', app2));

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
);