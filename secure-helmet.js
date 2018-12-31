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
	direcxtives: {
		defaultSrc:[`'none'`],
		scriptSrc:[`'nonce-${suid'`],
		reportUrl: '/csp-violation',
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

