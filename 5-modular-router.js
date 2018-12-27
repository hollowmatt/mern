const express = require('express');
const app = express();
const router = express.Router();

router.get('/home',(request, response, next) => {
	const url = request.originalUrl;
	response.type('text/html');
	response.send(`
		<!DOCTYPE html>
		<html lang='en'>
			<head>
				<meta character-"utf-8">
				<title>WebApp powered by ExpressJS</title>
			</head>
			<body role='application'>
				<form method="post" action="/second/home">
					<input type="text" />
					<button type="submit">Send</button>
				</form>
			</body>
		</html>
	`)
})
router.post('/home',(request, response, next) => {
	response.send('Got it!');
});

app.use('/first', router);
app.use('/second', router);
app.listen(
	1337,
	()=> console.log('Web server running on port 1337'),
);