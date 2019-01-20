const http = require('http');
const fs = require('fs');
const path = require('path');
const io = require('socket.io')();

const app = http.createServer((req, res) => {
	if (req.url ==='/') {
		fs.readFile(
			path.resolve(__dirname, 'middleware-cli.html'),
			(err, data) => {
				if(err) {
					res.writeHead(500);
					return void res.end();
				}
				res.writeHead(200);
				res.end(data);
			}
		);
	} else {
		res.writeHead(403);
		res.end();
	}
});

io.path('/socket.io');

const users = [
	{ username: 'fretwes', password: 'paul11' },
	{ username: 'hollowmatt', password: 'sheila11' },
	{ username: 'nipper', password: 'cartright' }
];

const userMatch = (username, password) => ( 
	users.find(user => {
		user.username === username &&
		user.password === password
	})
);

const isUserLoggedIn = (socket, next) => {
	const { session } = socket.request;
	if(session && session.isLogged) {
		next();
	}
};

const namespace = {
	home: io.of('/home').use(isUserLoggedIn),
	login: io.of('/login')
};

namespace.login.on('connection', socket => {
	socket.use((packet, next) => {
		cost [evtName, data] = packet;
		const user = data;
		if(evtName === 'tryLogin' && user.username === 'nipper') {
			socket.emit('loginError', { message: 'Banned User' });
		} else {
			next();
		}
	});
	socket.on('tryLogin', UserData => {
		const { username, password } = userData;
		const request = socket.request;
		if(userMatch(username, password)) {
			request.session = {
				isLogged: true,
				usernam
			};
			socket.emit('loginSuccess');
		} else {
			socket.emit('loginError', { message: 'Invalid Credentials '});
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