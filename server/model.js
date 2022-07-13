const mongoose = require('mongoose');
const {Schema, ObjectId} = require("mongoose");

// create schema

const UserSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: [true, 'Why no name?']
    },
    email: {String},
    ics: String,
    meetings: [ { type: String, ref: 'Meeting' }],
    auth: [{}]
});

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
    range: [{
        startDate: Date,
        endDate: Date
    }],
    userAvailability: [{
        user:  { type: String, ref: 'User' },
        availableSlots: [String]
    }]
});


// const GuestUserSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: [true, 'Why no userId?']
//     },
//     name: {
//         type: String,
//         required: [true, 'Why no name?']
//     },
//     auth: [{}]
// });

// create model
const Meeting = mongoose.model('Meeting', MeetingSchema);
const User = mongoose.model('User', UserSchema);
// const GuestUser = mongoose.model('GuestUser', GuestUserSchema);

my_schemas = {Meeting, User};
module.exports = my_schemas;