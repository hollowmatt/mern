const { connection, Schema } = require('mongoose');
const crypto = require('crypto');
//crypto used to create password hashes

//schema for mongo storage
const UserSchema = new Schema({
	username: {
		type: String,
		minlength: 4,
		maxlength: 20, 
		required: [true, 'username is required'],
		validate: {
			validator: function (value) {
				return /^[a-zA-Z]+$/.test(value)
			},
			message: '{VALUE} is not a valid username',
		},
	},
	password: String,
});

//****
//* Model method definitions below:
//****

//static model method for login
UserSchema.static('login', async function(usr, pwd) {
	const hash = crypto.createHash('sha256').update(String(pwd));
	const user = await this.findOne()
		.where('username').equals(usr)
		.where('password').equals(hash.digest('hex'));
	if(!user) throw new Error('Invalid login');
	delete user.password;
	return user;
});

//static model method for signup
UserSchema.static('signup', async function(usr, pwd) {
	if (pwd.length < 6) {
		throw new Error('Password must be greater than 6 chars');
	}
	const hash = crypto.createHash('sha256').update(String(pwd));
	const exist = await this.findOne()
		.where('username').equals(usr);
	if(exist) throw new Error('Username already exists');
	const user = this.create({
		username: usr,
		password: hash.digest('hex'),
	})
	return user;
});

//instance model method for changing password
UserSchema.method('changePass', async function(pwd) {
	if (pwd.length < 6) {
		throw new Error('Password must be greater than 6 chars');
	}
	const hash = crypto.createHash('sha256').update(String(pwd));
	this.password = hash.digest('hex');
	return this.save();
});

//compile and export the model
module.exports = connection.model('User', UserSchema);