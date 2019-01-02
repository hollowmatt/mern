const express = require("express");
const fs = require('fs');
const app = express();

app.engine('tpl', (filepath, options, callback) => {
	
});

app.set('views', './views');
app.set('view engine', 'tpl');

app.get('/', (request, response, next) => {
	response.render('home', {
		title: 'Hello',
		description: 'World!',
	});
});