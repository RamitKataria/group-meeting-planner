const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

let usersData = require('../data/users');
let items = usersData.items;

router.get('/:userId/meetings/:meetingId', function (req, res, next) {
	const user = items.find(item => item.userId === req.params['userId']);
	const meeting = user.meetings.find(item => item.meetingId === req.params['meetingId']);
	if (meeting) {
		return res.send(meeting);
	}
	return res.status(404).send({message: 'Not found'});
});

router.get('/:userId/meetings', function (req, res, next) {
	const user = items.find(item => item.userId === req.params['userId']);
	if (user) {
		return res.send(user.meetings);
	}
	return res.status(404).send({message: 'Not found'});
});

router.get('/:userId', function (req, res, next) {
	const user = items.find(item => item.userId === req.params['userId']);
	if (user) {
		return res.send(user);
	}
	return res.status(404).send({message: 'Not found'});
});

router.put('/:userId', function (req, res) {
	const index = items.findIndex(item => item.userId === req.params['userId']);
	if (index > -1) {
		items[index] = {...req.body, userId: req.params['userId']};
		return res.send({message: 'OK'});
	}
	return res.status(404).send({message: 'Not found'});
})

module.exports = router;