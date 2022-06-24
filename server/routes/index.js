const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({message: 'Hello, you are at index'});
});

module.exports = router;
