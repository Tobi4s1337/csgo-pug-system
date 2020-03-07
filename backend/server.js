const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const passportSetup = require('./passport/passportSetup');
require('dotenv').config();

mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost:27017/pug', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const app = express();

app.use(cors());
app.use(require('morgan')('combined'));
app.use(
	require('body-parser').urlencoded({
		extended: true
	})
);
app.use(passport.initialize());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3000);
