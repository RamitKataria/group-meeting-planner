const mongoose = require('mongoose');
const {Schema, ObjectId} = require("mongoose");

// create schema

const UserSchema = new mongoose.Schema({
	_id: String,
	name: {
		type: String,
		required: [true, 'Why no name?']
	},
	email: String,
	ics: String,
	meetings: [ { type: String, ref: 'Meeting' }],
	auth: [{}]
});

// create model
const User = mongoose.model('User', UserSchema);

module.exports = User;