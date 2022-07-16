const Meeting = require('../model/meeting');

const meetingsQueries = {
    // get one/all meetings
    getMeetings: async function (filter) {
        const meetings = await Meeting.find(filter);
        return meetings;
    },
    // delete one meeting, return lists of existing
    deleteOneMeeting: async function (id) {
        // findByIdAndDelete(id) returns document deleted.
        const meetings = await Meeting.findByIdAndDelete(id);
        return meetings;
    },
    // delete all meetings
    deleteAllMeetings: async function (filter) {
        // deleteMany(filter) returns {deletedCount: 3}
        const meetings = await Meeting.deleteMany(filter);
        return meetings;
    },
    // update an existing meeting
    updateOneMeeting: async function (id, obj) {
        const meeting = await Meeting.findByIdAndUpdate(id, obj);
        return meeting;
    },
    // create a new meeting
    insertOneMeeting: async function (meeting) {
        const newMeeting = await Meeting.insertMany(meeting);
        return newMeeting;
    }
}

module.exports = meetingsQueries;