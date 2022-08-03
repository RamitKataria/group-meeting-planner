const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const cors = require('cors');


const { validateFirebaseIdToken } = require('./auth');
const indexRouter = require('./routes/index');
const meetingsRouter = require('./routes/meetings');
const usersRouter = require('./routes/users');
const emailRouter  = require('./routes/sendEmail')
const app = express();

app.use(cors());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validateFirebaseIdToken);

const mongoose = require('mongoose');
const generateUsers = require('./generate-data');
const generateMeetings = require("./generate-data");
const generateData = require("./generate-data");

main().catch(err => console.log(err));

async function main() {
	console.log("connecting :)");
	await mongoose.connect("mongodb+srv://" + process.env.ATLAS_USERNAME + ":" + process.env.ATLAS_PASSWORD + "@" + process.env.DB_CLUSTER + ".mongodb.net/?retryWrites=true&w=majority",
		{dbName: process.env.DB_NAME});
	// await mongoose.connect('mongodb://localhost:27017/sandbox');

	// await generateData();

}

// app.use('/', indexRouter);
app.use('/meetings', meetingsRouter);
app.use('/users', usersRouter);
app.use('/sendmail',emailRouter);

if (process.env.SERVE_STATIC) {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

module.exports = app;
