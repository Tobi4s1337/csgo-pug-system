const express = require('express');
const path = require('path');
require('dotenv').config();

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
app.use(express.static(path.join(__dirname, 'client')));

app.listen(process.env.PORT || 3000);
