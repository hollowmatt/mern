const mongoose = require('mongoose');
const { connection, Schema } = mongoose;
mongoose.connect(
	'mongodb://localhost:27017/test'
).catch(console.error);

const UserSchema = new Schema ({
	firstName: String,
	lastName: String,
	likes: [String]
});

UserSchema.method('setFullName', function setFullName(v) {
	const fullName = String(v).split(' ');
	this.lastName = fullName[0] || '';
	this.firstName = fullName[1] || '';
});

UserSchema.method('getFullName', function getFullName() {
	return `${this.lastName} ${this.firstName}`;
});

UserSchema.method('loves', function loves(stuff) {
	this.likes.push(stuff);
});

UserSchema.method('dislikes', function dislikes(stuff) {
	this.likes = this.likes.filter(str => str !== stuff);
});

const User = mongoose.model('User', UserSchema);

connection.once('connected', async () => {
	try {
		const user = new User();
		user.setFullName('Blow Joe');
		user.loves('cats');
		user.loves('dogs');
		user.loves('music');
		await user.save();
		const person = await User.findOne()
			.where('firstName', 'Joe')
			.where('likes').in(['cats', 'dogs'])
		person.dislikes('music');
		await person.save();
		console.log(person.getFullName());
		console.log(JSON.stringify(person, null, 4));
		await user.remove();
	} catch(error) {
		console.dir(error.message, {colors: true});
	} finally {
		await connection.close();
	}
});