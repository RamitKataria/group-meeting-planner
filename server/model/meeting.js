const mongoose = require('mongoose');
const {Schema, ObjectId} = require("mongoose");

// create schema

const MeetingSchema = new mongoose.Schema({
	_id: String,
	name: {
		type: String,
		required: [true, 'Why no meeting name?']
	},
	description: String,
	dateTimeCreated: Date,
	dateTimeUpdated: Date,
	createdBy: { type: String, ref: 'User' },
	range: [[Date]],
	userAvailability: [{
		_id : false ,
		user:  { type: String, ref: 'User' },
		availableSlots: [Date]
	}]
});

// create model
const Meeting = mongoose.model('Meeting', MeetingSchema);

module.exports = Meeting;