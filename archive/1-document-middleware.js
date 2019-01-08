const mongoose = require('mongoose');
const { connection, Schema } = mongoose;
mongoose.connect(
	'mongodb://localhost:27017/test'
).catch(console.error);

const UserSchema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true },
});

UserSchema.pre('init', async function preInit() {
	console.log('will init');
});

UserSchema.post('init', async function postInit() {
	console.log('has init');
});

UserSchema.pre('validate', async function preInit() {
	console.log('will validate');
});

UserSchema.post('validate', async function postInit() {
	console.log('has validate');
});

UserSchema.pre('save', async function preInit() {
	console.log('about to save');
});

UserSchema.post('save', async function postInit() {
	console.log(`have saved doc with id=${this.id}`);
});

UserSchema.pre('remove', async function preInit() {
	console.log(`gonna remove doc with id=${this.id}`);
});

UserSchema.post('remove', async function postInit() {
	console.log(`removed doc with id=${this.id}`);
});

const User = mongoose.model('User', UserSchema);

connection.once('connected', async () => {
	try {
		const user = new User({
			firstName: 'John',
			lastName: 'Smith',
		});
		await user.save();
		await User.findById(user.id);
		await user.remove();
		await connection.close();
	} catch (error) {
		await connection.close();
		console.dir(error.message, { colors: true });
	}
});