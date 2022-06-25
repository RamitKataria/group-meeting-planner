const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

let meetingsData = require('../data/meetings');
let items = meetingsData.items;

router.delete('/:meetingId', function (req, res) {
	const index = items.findIndex(item => item.meetingId === req.params['meetingId']);
	if (index > -1) {
		items.splice(index, 1);
		return res.send({message: 'Deleted'});
	}
	return res.status(404).send({message: 'Not found'});
})

router.put('/:meetingId', function (req, res) {
	const index = items.findIndex(item => item.meetingId === req.params['meetingId']);
	if (index > -1) {
		items[index] = {...req.body, meetingId: req.params['meetingId']};
		return res.send({message: 'OK'});
	}
	return res.status(404).send({message: 'Not found'});
})

router.get('/:meetingId', function (req, res, next) {
	const item = items.find(item => item.meetingId === req.params['meetingId']);
	if (item) {
		return res.send(item);
	}
	return res.status(404).send({message: 'Not found'});
});

router.post('/', function (req, res) {
	if (req.body) {
		const item = {...req.body, meetingId: uuidv4()};
		items.push(item);
		return res.send(item);
	}
	return res.status(400).send({message: 'Invalid body'});
})

module.exports = router;
