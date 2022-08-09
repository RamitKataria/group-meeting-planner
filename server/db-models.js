const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb+srv://" + process.env.ATLAS_USERNAME + ":" + process.env.ATLAS_PASSWORD + "@" + process.env.DB_CLUSTER + ".mongodb.net/?retryWrites=true&w=majority",
    {dbName: process.env.DB_NAME});


const MeetingSchema = new mongoose.Schema({
    id: {
      type: String,
      index: true,
      unique: true
    },
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
    firebaseUID: {
        type: String,
        index: true,
        unique: true
    }
});

const User = mongoose.model('User', UserSchema);

function removeForbiddenFields(obj) {
    const objJSON = obj.toJSON();
    ['_id', '__v', 'firebaseUID'].forEach(i => delete objJSON[i]);
    return objJSON;
}

module.exports = { Meeting, User, removeForbiddenFields }
