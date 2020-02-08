const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost:27017/pug', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const app = express();

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(
	require('body-parser').urlencoded({
		extended: true
	})
);
app.use(
	require('express-session')({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client')));

app.listen(process.env.PORT || 3000);
