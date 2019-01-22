const path = require('path');
const express = require('express');
const io = require('socket.io')();
const expressSession = require('express-session');
const app = express();

io.path('/socket.io');

const session = expressSession({
	secret: 'MERN cookbook',
	resave: true,
	saveUninitialized: true
});

const ioSession = (socket, next) => {
	const req = socket.request;
	const res = socket.request.res;
	session(req, res, (err) => {
		next(err);
		req.session.save();
	});
};

const home = io.of('/home');
const login = io.of('/login');

const users = [
	{ username: 'fretwes', password: 'paul11' },
	{ username: 'hollowmatt', password: 'sheila11' },
	{ username: 'catnip', password: 'cartright' },
];

app.use(session);

app.get('/home', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'io-express-cli.html'));
});

home.use(ioSession);
home.use((socket, next) => {
	const { session } = socket.request;
	if(session.isLogged) {
		next();
	}
});

home.on('connection', (socket) => {
	const { username } = socket.request.session;
	socket.emit(
		'welcome', 
		`Welcome ${username}, you are now logged in `
	)
});

login.use(ioSession);
login.on('connection', (socket) => {
	socket.on('enter', (data) => {
		console.log('in the enter emit');
		const { username, password } = data;
		console.log(username + ", " + password);
		const { session } = socket.request;
		const found = users.find((user) => (
			user.username === username &&
			user.password === password
		));
		if(found) {
			session.isLogged = true;
			session.username = username;
			socket.emit('loginSuccess');
		} else {
			socket.emit('loginError', {
				message: 'Invalid Credentials',
			});
		}
	});
});

io.attach(
	app.listen(
		1337,
		() => {
			console.log('HTTP Server and Socket.IO running on port 1337');
		}
	)
);