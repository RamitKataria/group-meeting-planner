const { nanoid } = require('nanoid');
const express = require('express');
const router = express.Router();

const {confirmAuthenticated} = require("../auth");
const {Meeting, removeForbiddenFields} = require("../db-models");

router.delete('/:meetingID', confirmAuthenticated, async function (req, res) {
	try {
		await Meeting.deleteOne({id: req.params.meetingID});
		return res.status(200).send('Deleted');
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

/**
 * Modify availability slots of a given user in a given meeting, perserving all other meetingInfo
 */
router.post("/availability/:meetingID/:userID", async function(req, res) {
	try {
		console.log(req.body)
		const meetings = await meetingsQueries.getMeetings({"id": req.params.meetingID});
		if (meetings.length === 0) {
			return res.status(400).send("Invalid meeting id")
		}
		let slots = meetings[0].userAvailability;
		let idx = slots.findIndex(e => e.user === req.params.userID);
		if (idx === -1) {
			// TODO: check that userId is authenticated
			slots.push(req.body)
		} else {
			slots[idx] = req.body
		}

		const newMeeting = {
			...meetings[0], 
			userAvailability: slots, 
			id: req.params.meetingID
		};
		const updatedmeeting = await meetingsQueries.updateOneMeeting(req.params.meetingID, newMeeting);
		return res.send(updatedmeeting);
	} 
	catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error\n");
	}
});

router.patch('/:meetingID', confirmAuthenticated, async function (req, res) {
	try {
		const meeting = await Meeting.findOne({id: req.params.meetingID});
		if (!meeting) {
			return res.status(404).send('Not found');
		}
		const patches = removeForbiddenFields(req.body);
		Object.assign(meeting, patches);
		await meeting.save();
		return res.send(removeForbiddenFields(meeting));
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
});

router.get('/:meetingID', async function (req, res) {
	try {
		const meeting = await Meeting.findOne({id: req.params.meetingID});
		if (!meeting) {
			return res.status(404).send('Not found');
		}
		const populatedMeeting = await populateUsers(meeting)
		return res.send(removeForbiddenFields(populatedMeeting));
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
});

router.post('/', async function (req, res) {
	try {
		const newMeeting = new Meeting(removeForbiddenFields(req.body));
		newMeeting.id = nanoid();
		await newMeeting.save();
		return res.send(removeForbiddenFields(newMeeting));
	} catch (e) {
		console.log(e);
		res.status(500).send("Internal Server Error");
	}
});


/**
 * Replace all user ids with user objects 
 */
async function populateUsers(meeting) {
	let userAvailability = []
	let createdBy = {}

	try {
		userAvailability = await Promise.all(
			meeting.userAvailability.map(async (availEntry) => {
				const user = await User.findOne({"firebaseUID": availEntry.user}).lean();
				
				return {
					...availEntry,
					userInfo: {
						name: user.name,
						email: user.email,
					},
				}
			})
		)
		
		createdBy = await User.findOne({"firebaseUID": meeting.createdBy}).lean();
		
		return {
			...meeting,
			createdByInfo: {
				name: createdBy.name,
				email: createdBy.email,
			},
			userAvailability: userAvailability,
		}
	} catch (e) {
		console.log('Failed to populate users in meetingInfo\n');
		console.log(e);
		return meeting;
	}
}

module.exports = router;
