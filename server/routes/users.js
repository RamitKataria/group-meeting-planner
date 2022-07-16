const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

let usersData = require('../data/users');
let items = usersData.items;
const meetingsQueries = require("../queries/meetings");
const usersQueries = require("../queries/users");

router.get('/:userId/meetings/:meetingId', async function (req, res, next) {
	const user = await usersQueries.getUser({"_id": req.params.userId});
	const meetings = user.meetings;

	if (meetings.includes(req.params.meetingId)) {
		const meeting = meetingsQueries.getMeetings({"_id": req.params.meetingId});
		return res.send(meeting);
	} else {
		return res.status(404).send({message: 'Meeting Not found'});
	}
});

router.get('/:userId/meetings', async function (req, res, next) {
	const user = await usersQueries.getUser({_id: req.params.userId});

	return res.send(user[0].meetings);
});

router.get('/:userId', async function (req, res, next) {
	const user = await usersQueries.getUser({"_id": req.params.userId});

	return res.send(user[0]);
});

router.patch('/:userId', async function (req, res) {
	const user = await usersQueries.getUser({"_id": req.params.userId});

	const newUser = {...user, ...req.body, _id: req.params.userId};
	const updateduser = await usersQueries.updateOneUser(id, newUser);
	return res.send(updateduser);
});

router.delete('/:userId', async function (req, res, next) {
	const user = await usersQueries.deleteOneUser(req.params.userId);

	return res.send({message: 'Deleted'});
});

router.post('/', async function(req, res, next){
	if (req.body) {
		const newUser = {...req.body, _id: uuidv4()};

		await usersQueries.insertOneRecipe(newUser);
		return res.send(newUser);
	}
	return res.status(400).send({message: 'Invalid body'});
});

module.exports = router;