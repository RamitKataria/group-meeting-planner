const express = require('express');
const router = express.Router();
require("dotenv").config();

router.get('/', function (req, res, next) {
    res.send({message: 'Hello, you are at index'});
    const sgMail = require('@sendgrid/mail');


    sgMail.setApiKey(process.env.KEY);

    const message = {
        to: process.env.email,
        from: process.env.email,
        subject: 'Your meeting is set',
        text: 'Your meeting is set'
    };

    sgMail.send(message)
        .then((response) => {
            console.log('Email sent ... ')
        })
        .catch((error) => {
            console.log(error.message)
        });


});

module.exports = router;

