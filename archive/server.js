const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const api = require('./api/controller');
const app = express();

const db = mongoose.connect(
	'mongodb://localhost:27017/test'
).then(conn => conn).catch(console.error);

app.use(bodyParser.json());

//ensures an open Mongo connection before allowing 
//routes to be executed.
app.use((request, response, next) => {
	Promise.resolve(db).then(
		(connection, err) => (
			typeof connection !== 'undefined'
			? next()
			: next(new Error('MongoError'))
		)
	);
});

//store sessions in Mongo instead of in memory
app.use(session({
	secret: 'MERN QSG',
	resave: false,
	saveUnitialized: true,
	store: new MongoStore({
		collection: 'sessions',
		mongooseConnection: mongoose.connection,
	}),
}));

app.use('/users', api);

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
);