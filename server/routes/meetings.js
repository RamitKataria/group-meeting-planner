const { nanoid } = require('nanoid');
const express = require('express');
const router = express.Router();

let meetingsData = require('../data/meetings');
let items = meetingsData.items;
const meetingsQueries = require("../queries/meetings");
const usersQueries = require("../queries/users");

router.delete('/:meetingId', async function (req, res) {
	if (!req.user) {
		return res.status(403).send('Unauthorized');
	}
	const meetings = await meetingsQueries.deleteOneMeeting(req.params['meetingId']);

	return res.send(meetings);
})
//
// router.delete('/', function (req, res) {
// 	const meetings = await meetingsQueries.deleteAllMeetings({});
// 	return res.send(meetings);
// })

/**
 * Modify availability slots of a given user in a given meeting, perserving all other meetingInfo
 */
router.post("/availability/:meetingId/:userId", async function(req, res) {
	try {
		console.log(req.body)
		const meetings = await meetingsQueries.getMeetings({"_id": req.params.meetingId});
		if (meetings.length === 0) {
			return res.status(400).send("Invalid meeting id")
		}
		var slots = meetings[0].userAvailability;
		var idx = slots.findIndex(e => e.user === req.params.userId);
		if (idx === -1) {
			// TODO: check that userId is authenticated
			slots.push(req.body)
		} else {
			slots[idx] = req.body
		}

		const newMeeting = {
			...meetings[0], 
			userAvailability: slots, 
			_id: req.params.meetingId
		};
		const updatedmeeting = await meetingsQueries.updateOneMeeting(req.params.meetingId, newMeeting);
		return res.send(updatedmeeting);
	} 
	catch (e) {
		console.log(e);
		res.status(400).send("Internal Server Error\n");
	}
})

router.patch('/:meetingId', async function (req, res) {
	try {
		const meeting = await meetingsQueries.getMeetings({"_id": req.params.meetingId});
		if (meeting.length === 0) {
			res.status(400).send("Invalid meeting id")
		}
		const newMeeting = {...meeting[0], ...req.body, _id: req.params.meetingId};
		const updatedmeeting = await meetingsQueries.updateOneMeeting(req.params.meetingId, newMeeting);
		return res.send(updatedmeeting);
	}
	catch (e) {
		console.log(e);
		res.status(400).send("Internal Server Error\n");
	}
})

router.get('/:meetingId', async function (req, res, next) {
	try {
		const meeting = await meetingsQueries.getMeetings({"_id": req.params.meetingId});

		return res.send(meeting[0]);
	} catch (e) {
		res.status(400).send("Internal Server Error");
	}
});

router.post('/', async function (req, res) {
	if (req.body) {
		const newMeeting = {...req.body, _id: nanoid()};
		await meetingsQueries.insertOneMeeting(newMeeting);
		return res.send(newMeeting);
	}
	return res.status(400).send({message: 'Invalid body'});
})

module.exports = router;
