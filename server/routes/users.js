const express = require('express');
const router = express.Router();

const { deleteUserInFirebase, confirmAuthenticated} = require('../auth')
const { Meeting, User, removeBuiltInFields } = require("../db-models");


async function getUserOrInit(firebaseUID) {
	let user = await User.findOne({firebaseUID: firebaseUID});
	if (user) {
		return user;
	}
	user = new User({firebaseUID: firebaseUID});
	await user.save();
	return user;
}

router.get('/:userID/meetings', confirmAuthenticated, async function (req, res) {
	try {
		const user = await getUserOrInit(req.params.userID);
		return res.send(user.meetings);
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

router.get('/:userID', confirmAuthenticated, async function (req, res) {
	try {
		const user = await getUserOrInit(req.params.userID);
		return res.send(removeBuiltInFields(user));
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

router.patch('/:userID', confirmAuthenticated, async function (req, res) {
	try {
		const user = await getUserOrInit(req.params.userID);
		const patches = req.body;
		['id', '_id', 'firebaseUID'].forEach(key => delete patches[key]);
		Object.assign(user, patches);
		console.log('patching user\n' + JSON.stringify(patches))
		await user.save();
		return res.send(user);
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

router.post('/:userID/meetings', confirmAuthenticated, async function (req, res) {
	try {
		const newMeetingID = req.body;
		if (typeof newMeetingID !== "string") {
			return res.status(400).send('Body is not a string');
		}
		if (!Meeting.exists({id: newMeetingID})) {
			return res.status(400).send('Meeting does not exist');
		}
		const user = await getUserOrInit(req.params.userID);
		user.meetings.push(newMeetingID);
		return res.status(200).send(newMeetingID);
	} catch (e) {
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
		const user = await getUserOrInit(req.params.userID);
		user.ics = newLink;
		return res.status(200).send('Calendar link set');
	} catch (e) {
		return res.status(500).send('Internal server error');
	}
});

router.delete('/:userID', confirmAuthenticated, async function (req, res) {
	try {
		await deleteUserInFirebase(req.params.firebaseUID);
		await User.deleteOne({firebaseUID: req.params.firebaseUID});
		return res.status(200).send('Deleted');
	} catch (e) {
		return res.status(404).send('Not found');
	}
});

router.post('/', async function (req, res) {
	try {
		if (User.exists({firebaseUID: req.user.uid})) {
			return res.status(400).send('User already exists');
		}
		const newUser = new User({firebaseUID: req.user.uid});
		await newUser.save();
		return res.status(200).send(removeBuiltInFields(newUser));
	} catch (e) {
		return res.status(400).send('Internal server error');
	}
});

module.exports = router;
