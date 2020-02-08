const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	steamId: String,
	steamurl: String,
	image: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
