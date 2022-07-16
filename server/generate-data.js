const Meeting = require('./model/meeting');
const User = require('./model/user');
// const User = require('./model');
const mongoose = require("mongoose");
const {Types} = require("mongoose");
// const GuestUser = require('./model');

function generateUsers() {
    const ramit = new User({
        _id: "d515b255-0691-4778-9796-cb4f41840136",
        name: "Ramit Kataria",
        email: "ramitkataria@gmail.com",
        ics: "https://calendar.google.com/calendar/ical/chaisuefeisophie%40gmail.com/public/basic.ics",
        meetings: [
            {
                _id: "de382de9-799b-4351-95ed-1dd92c151263" // hiking
            },
            {
                _id: "fc73754b-00be-4fa4-b02f-1efad9cffe05" // boxing
            }
        ],
        auth: [{}]
    })
    const tom = new User({
        _id: "ea0f9ae2-2c9e-40eb-9bae-c40054addcf9",
        name: "Tom Mo",
        email: "tommo@gmail.com",
        ics: "https://calendar.google.com/calendar/ical/chaisuefeisophie%40gmail.com/public/basic.ics",
        meetings: [
            {
                _id: "de382de9-799b-4351-95ed-1dd92c151263" // hiking
            },
            {
                _id: "fc73754b-00be-4fa4-b02f-1efad9cffe05", //boxing
            }
        ],
        auth: [{}]
    });
    const may = new User({
        _id: "81409ec3-deac-41ef-9da2-7c0c1b324321",
        name: "May Tang",
        email: "maytang@gmail.com",
        ics: "https://calendar.google.com/calendar/ical/chaisuefeisophie%40gmail.com/public/basic.ics",
        meetings: [
            {
                _id: "de382de9-799b-4351-95ed-1dd92c151263" // hiking
            }
        ],
        auth: [{}]
    });

    // guest user
    const sophie = new User({
        _id: "baebcdfb-4fc0-411d-9934-0d9ffa57ffe1",
        name: "Sophie Chai",
        auth: [{}]
    });
    
    // Save a users to db
    User.insertMany([ramit,tom,may,sophie], function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Save users to (db: meetingsDB, collection: users)!!");
        }
    })
}

function generateMeetings() {
    // make a recipe
    const hiking = new Meeting({
        _id: "de382de9-799b-4351-95ed-1dd92c151263",
        name: "Hiking Day",
        description: "let's go hiking!",
        dateTimeCreated: new Date(2021, 3, 20, 21, 9, 14), // "20-03-2021 21:09:14",
        dateTimeUpdated: new Date(2021, 4, 9, 12, 2, 19),
        createdBy: {
            _id: "ea0f9ae2-2c9e-40eb-9bae-c40054addcf9" // tom
        },
        range: [],
        userAvailability: [
            {
                user: { _id: "d515b255-0691-4778-9796-cb4f41840136"}, // ramit
                availableSlots: []
            },
            {
                user: "baebcdfb-4fc0-411d-9934-0d9ffa57ffe1", // guest sophie
                availableSlots: []
            },
            {
                user: "81409ec3-deac-41ef-9da2-7c0c1b324321", // may
                availableSlots: []
            }
        ]
    });

    const boxing = new Meeting(	{
        _id: "fc73754b-00be-4fa4-b02f-1efad9cffe05",
        name: "Boxing Day",
        description: "let's go boxing!",
        dateTimeCreated: new Date(2021, 6, 15, 21, 9, 14), // "15-06-2021 21:09:14",
        dateTimeUpdated: new Date(2021, 7, 10, 11, 59, 34), // "10-07-2022 11:59:34",
        createdBy: {
            _id: "d515b255-0691-4778-9796-cb4f41840136" // ramit
        },
        range: [],
        userAvailability: [
            {
                user: { _id: "d515b255-0691-4778-9796-cb4f41840136" }, // ramit
                availableSlots: []
            },
            {
                user: { _id: "ea0f9ae2-2c9e-40eb-9bae-c40054addcf9" }, // tom
                availableSlots: []
            },
        ]
    });

    // Save a meetings to db
    Meeting.insertMany([hiking, boxing], function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Save meetings to (db: meetingsDB, collection: meetings)!!");
        }
    })

}

// to created reference between collections. NOT WORKING ATM.
function populate() {
    Meeting.find({}).populate('createdBy').exec(function (err, story) {
        if (err)
            console.log(err);
       else
           console.log('Sucess!! :)');
    });
}
function generateData() {
    generateUsers();
    generateMeetings();
    // populate();
}

// module.exports = generateUsers;
// module.exports = generateMeetings;
module.exports = generateData;