const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);


const MeetingSchema = new mongoose.Schema({
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
        id : false ,
        user:  { type: String, ref: 'User' },
        availableSlots: [Date]
    }]
});

const Meeting = mongoose.model('Meeting', MeetingSchema);

const UserSchema = new mongoose.Schema({
    ics: String,
    meetings: [ { type: String, ref: 'Meeting' }],
    firebaseUID: String
});

const User = mongoose.model('User', UserSchema);

module.export = { Meeting, User }
