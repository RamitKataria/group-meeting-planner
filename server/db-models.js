const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb+srv://" + process.env.ATLAS_USERNAME + ":" + process.env.ATLAS_PASSWORD + "@" + process.env.DB_CLUSTER + ".mongodb.net/?retryWrites=true&w=majority",
    {dbName: process.env.DB_NAME});


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

module.exports = { Meeting, User }
