const express = require('express');
const router = express.Router();

const { validateFirebaseIdToken, deleteUserInFirebase, confirmAuthenticated} = require('../auth')
const { User } = require("../db-models");


async function getUserOrInit(firebaseUID) {
	let user = await User.findOne({firebaseUID: firebaseUID});
	if (user) {
		return user;
	}
	user = new User({firebaseUID: firebaseUID});
	await user.save();
	return user;
}

router.get('/:userID/meetings', confirmAuthenticated, async function (req, res, next) {
	try {
		const user = await getUserOrInit(req.params.userID);
		return res.send(user.meetings);
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

router.get('/:userID', confirmAuthenticated, async function (req, res, next) {
	try {
		const user = await getUserOrInit(req.params.userID);
		return res.send(user);
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
		await user.save();
		return res.send(user);
	} catch (e) {
		console.log(e);
		return res.status(404).send('Not found');
	}
});

router.delete('/:userID', confirmAuthenticated, async function (req, res, next) {
	try {
		await deleteUserInFirebase(req.params.firebaseUID);
		await User.deleteMany({firebaseUID: req.params.firebaseUID});
		return res.status(200).send('Deleted');
	} catch (e) {
		return res.status(404).send('Not found');
	}
});

module.exports = router;
