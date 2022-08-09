const express = require('express');
const router = express.Router();

const { deleteUserInFirebase, confirmAuthenticated} = require('../auth')
const { Meeting, User, removeForbiddenFields } = require("../db-models");


router.get('/:userID/meetings', confirmAuthenticated, async function (req, res) {
	try {
		const user = await User.findOne({firebaseUID: req.user.uid}).lean();
		if (!user) {
			return res.status(404).send('Not found');
		}
		return res.send(user.meetings);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.get('/:userID', confirmAuthenticated, async function (req, res) {
	try {
		const user = await User.findOne({firebaseUID: req.user.uid}).lean();
		if (!user) {
			return res.status(404).send('Not found');
		}
		return res.send(removeForbiddenFields(user));
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.patch('/:userID', confirmAuthenticated, async function (req, res) {
	try {
		const user = await User.findOne({firebaseUID: req.user.uid});
		if (!user) {
			return res.status(404).send('Not found');
		}
		const patches = removeForbiddenFields(req.body);
		Object.assign(user, patches);
		await user.save();
		return res.send(removeForbiddenFields(user));
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.post('/:userID/meetings', confirmAuthenticated, async function (req, res) {
	try {
		const newMeetingID = req.body;
		if (typeof newMeetingID !== "string") {
			return res.status(400).send('Body is not a string');
		}
		if (!(await Meeting.exists({id: newMeetingID}))) {
			return res.status(404).send('Meeting does not exist');
		}
		const user = await User.findOne({firebaseUID: req.user.uid});
		if (!user) {
			return res.status(404).send('User Not found');
		}
		user.meetings.push(newMeetingID);
		return res.status(200).send(newMeetingID);
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.put('/:userID/calendar-link', confirmAuthenticated, async function (req, res) {
	try {
		const newLink = req.body;
		if (typeof newLink !== "string") {
			return res.status(400).send('Body is not a string');
		}
		// TODO: validate file
		// if (!isValid(newLink)) {
		// 	return res.status(400).send('Could not read file');
		// }
		const user = await User.findOne({firebaseUID: req.user.uid});
		if (!user) {
			return res.status(404).send('User Not found');
		}
		user.ics = newLink;
		return res.status(200).send('Calendar link set');
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

router.delete('/:userID', confirmAuthenticated, async function (req, res) {
	try {
		await deleteUserInFirebase(req.params.firebaseUID);
		await User.deleteOne({firebaseUID: req.params.firebaseUID});
		return res.status(200).send('Deleted');
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

router.post('/', async function (req, res) {
	try {
		if (await User.exists({firebaseUID: req.user.uid})) {
			return res.status(400).send('User already exists');
		}
		const newUser = new User({firebaseUID: req.user.uid});
		await newUser.save();
		return res.status(200).send(removeForbiddenFields(newUser));
	} catch (e) {
		console.log(e);
		return res.status(500).send('Internal server error');
	}
});

module.exports = router;
