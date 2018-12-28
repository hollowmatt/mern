const express = require('express');
const app = express();
const router = express.Router();

router.use((request, response, next) => {
	if (!request.query.id) {
		next('router') //next - out of router -> app.get(...)
	} else {
		next(); //in router -> router.get(...)
	}
});

router.get('/', (request, response, next) => {
	const id = request.query.id;
	response.send(`You specified a user ID => ${id}`);
});

app.get('/', router, (request, response, next) => {
	response
		.status(400)
		.send('A user ID needs to be specified');
});

app.listen(
	1337,
	() => console.log('Web server running on port 1337'),
);