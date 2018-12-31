const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const uuid = require('uuid/v1');
const app = express();

const suid = uuid();

app.use(morgan('dev'));
app.use(bodyParser.json({
	type: ['json', 'application/csp-report'],
}));

// Do not allow unless whitelisted, only allow specified JS
app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc:[`'none'`],
		scriptSrc:[`'nonce-${suid}'`],
		reportUri: '/csp-violation',
	}
}));

// url to accept violation reports
app.post('/csp-violation', (request, response, next) => {
	const { body } = request;
	if(body) {
		console.log('CSP Report Violation: ');
		console.dir(body, {colors: true, depth: 5});
	}
	response.status(204).send();
});

// disable prefecthing of resources
app.use(helmet.dnsPrefetchControl({
	allow: false
}));

// disable ability to put in iFrame
app.use(helmet.frameguard({
	action: 'deny'
}));

// hide the tech from headers
app.use(helmet.hidePoweredBy( {
	setTo: 'Django/1.2.1 SVN-13336',
}))

//disable untrusted IE executions
app.use(helmet.ieNoOpen());

// use noSniff to disable mime type guessing
app.use(helmet.noSniff());

//make header avail only for current domain
app.use(helmet.referrerPolicy({
	policy: 'same-origin'
}));

//prevent XSS attacks
app.use(helmet.xssFilter());

app.get('/', (request, response, next) => {
	response.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset='utf-8'>
				<title>Dark Helmet</title>
			</head>
			<body>
				<span id='txtlog'></span>
				<img alt="evil picture" src="http://evil.com/pic.jpg">
				<script>
					alert('This does not get executed');
				</script>
				<script src="http://evil.com/evilstuff.js"></script>
				<script nonce="${suid}">
					document.getElementById('txtlog').innerText = 'Hello Dark Helmet'
				</script>
			</body>
		</html>
	`)
});

app.listen(
	1337,
	() => console.log('Web server running on port 1337'),
);
