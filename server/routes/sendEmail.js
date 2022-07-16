const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send({message: 'Hello, you are at index'});
    const sgMail = require('@sendgrid/mail');

    const KEY = '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';

    sgMail.setApiKey(KEY);

    const message = {
        to: 'dahaiwumi@gmail.com',
        from: 'dahaiwumi@gmail.com',
        subject: 'Your meeting is set',
        text:'Your meeting is set'
    };

    sgMail.send(message)
        .then((response)=>{console.log('Email sent ... ')})
        .catch((error)=>{console.log(error.message)} );


});

module.exports = router;

