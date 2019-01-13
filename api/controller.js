const express = require('express');
const User = require('./model');
const api = express.Router();

//Request handler to check if user is logged in
const isLogged = ({ session }, res, next) => {
	if (!session.user) res.status(403).json({
		status: 'You are not logged in',
	}) 
	else next()
};
//Request handler to check if not logged in
const isNotLogged = ({ session }, res, next) => {
	if (session.user) res.status(403).json({
		status: 'You are already logged in',
	})
	else next();
};

//POST method to login
api.post('/login', isNotLogged, async (req, res) => {
	try {
		const {session, body} = req;
		const {username, password} = body
		const user = await User.login(username, password);
		session.user = {
			_id: user._id,
			username: user.username,
		}
		session.save(() => {
			res.status(200).json({ status: 'Welcome' })
		})
	} catch(error) {
		res.status(403).json({error: error.message})
	}
});

//POST method to logout
api.post('/logout', isLogged, (req, res) => {
	req.session.destroy();
	res.status(200).send({status: 'Goodbye'});
});

//POST method to allow signup
api.post('/signup', async(req,res) => {
	try {
		const { session, body } = req;
		const { username, password } = body;
		const user = await User.signup(username, password);
		res.status(201).json({status: 'Created'});
	} catch(error) {
		res.status(403).json({error: error.message});
	}
});

//GET method to get profile data (must be logged in)
api.get('/profile', isLogged, (req, res) => {
	const { user } = req.session;
	res.status(200).json({ user });
});

//PUT method to change password (must be logged in)
api.put('/changepass', isLogged, async(req, res) => {
	try {
		const { session, body } = req;
		const { password } = body;
		const { _id } = session.user;
		const user = await User.findOne({ _id });
		if (user) {
			await user.changePass(password);
			res.status(200).json({ status: 'Password changed' });
		} else {
			res.status(403).json({ status: user })
		}
	} catch (error) {
		res.status(403).json({error: error.message});
	}
});

//DELETE method to delete a user
api.delete('/delete', isLogged, async(req, res) => {
	try {
		const { _id } = req.session.user;
		const user = await User.findOne({ _id });
		await user.remove();
		req.session.destroy((err) => {
			if(err) throw new Error(err);
			res.status(200).json({ status: 'Deleted.' });
		});
	} catch(error) {
		res.status(403).json({error: error.message});
	}
});

//export the API routes
module.exports = api;