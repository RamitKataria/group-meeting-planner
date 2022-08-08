const express = require('express');
const meetingsRouter = require("./meetings");
const usersRouter = require("./users");
const emailRouter = require("./sendEmail");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({message: 'Hello, you are at API index'});
});

router.use('/meetings', meetingsRouter);
router.use('/users', usersRouter);
router.use('/sendmail',emailRouter);

module.exports = router;
