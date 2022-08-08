const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

let usersData = require('../data/users');
let items = usersData.items;
const meetingsQueries = require("../queries/meetings");
const usersQueries = require("../queries/users");

router.get('/:userId/meetings/:meetingId', async function (req, res, next) {
	if (!req.user) {
		return res.status(403).send('Unauthorized');
	}
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
	try {
		if (!req.user) {
			return res.status(403).send('Unauthorized');
		}
		const user = await usersQueries.getUser({firebaseUID: req.params.userId});
		return res.send(user[0].meetings);
	} catch (e) {
		console.log(e);
		return res.status(403).send('Internal server error');
	}

});

// router.get('/:userId', async function (req, res, next) {
// 	if (!req.user) {
// 		return res.status(403).send('Unauthorized');
// 	}
// 	const user = await usersQueries.getUser({"_id": req.params.userId});
//
// 	return res.send(user[0]);
// });

router.get('/:userId', async function (req, res, next) {
	if (!req.user) {
		return res.status(403).send('Unauthorized');
	}
	const user = await usersQueries.getUser({"firebaseUID": req.params.userId});
	return res.send(user[0]);
});

router.patch('/:userId', async function (req, res) {
	if (!req.user) {
		return res.status(403).send('Unauthorized');
	}
	const userArray = await usersQueries.getUser({"firebaseUID": req.params.userId});
	const newUser = {...userArray, ...req.body, _id: userArray[0]._id, firebaseUID: userArray[0].firebaseUID};
	await usersQueries.updateOneUser(userArray[0]._id, newUser);
	const updatedUser = await usersQueries.getUser({"firebaseUID": req.params.userId});
	return res.send(updatedUser[0]);
});

router.delete('/:userId', async function (req, res, next) {
	if (!req.user) {
		return res.status(403).send('Unauthorized');
	}
	const user = await usersQueries.deleteOneUser(req.params.userId);

	return res.send({message: 'Deleted'});
});

router.post('/', async function(req, res, next){
	if (!req.user) {
		return res.status(403).send('Unauthorized');
	}
	if (req.body) {
		const newUser = {...req.body, _id: uuidv4()};

		await usersQueries.insertOneRecipe(newUser);
		console.log('new user added: \n' + newUser)
		return res.send(newUser);
	}
	return res.status(400).send({message: 'Invalid body'});
});

module.exports = router;