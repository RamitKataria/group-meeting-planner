const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');

const items = []

router.get('/', function (req, res, next) {
    res.send(items.map(item => item.id));
});

router.get('/:id', function (req, res, next) {
    const item = items.find(item => item.id === req.params['id']);
    if (item) {
        return res.send(item);
    }
    return res.status(404).send({message: 'Not found'});
});

router.post('/', function (req, res) {
    if (req.body) {
        const item = {...req.body, id: uuidv4()};
        items.push(item);
        return res.send(item);
    }
    return res.status(400).send({message: 'Invalid body'});
})

router.delete('/:id', function (req, res) {
    const index = items.findIndex(item => item.id === req.params['id']);
    if (index > -1) {
        items.splice(index, 1);
        return res.send({message: 'Deleted'});
    }
    return res.status(404).send({message: 'Not found'});
})

router.put('/:id', function (req, res) {
    const index = items.findIndex(item => item.id === req.params['id']);
    if (index > -1) {
        items[index] = {...req.body, id: req.params['id']};
        return res.send({message: 'OK'});
    }
    return res.status(404).send({message: 'Not found'});
})

module.exports = router;
