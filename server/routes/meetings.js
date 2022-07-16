const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

let meetingsData = require('../data/meetings');
let items = meetingsData.items;
const meetingsQueries = require("../queries/meetings");
const usersQueries = require("../queries/users");

router.delete('/:meetingId', async function (req, res) {
	const meetings = await meetingsQueries.deleteOneMeeting(req.params['meetingId']);

	return res.send(meetings);
})
//
// router.delete('/', function (req, res) {
// 	const meetings = await meetingsQueries.deleteAllMeetings({});
// 	return res.send(meetings);
// })

router.patch('/:meetingId', async function (req, res) {
	const meeting = await meetingsQueries.getMeetings({"_id": req.params.meetingId});

	const newMeeting = {...meeting, ...req.body, _id: req.params.meetingId};
	const updatedmeeting = await meetingsQueries.updateOneMeeting(id, newMeeting);
	return res.send(updatedmeeting);
})

router.get('/:meetingId', async function (req, res, next) {
	const meeting = await meetingsQueries.getMeetings({"_id": req.params.meetingId});

	return res.send(meeting[0]);
});

router.post('/', async function (req, res) {
	if (req.body) {
		const newMeeting = {...req.body, _id: uuidv4()};
		await meetingsQueries.insertOneMeeting(newMeeting);
		return res.send(newMeeting);
	}
	return res.status(400).send({message: 'Invalid body'});
})

module.exports = router;
