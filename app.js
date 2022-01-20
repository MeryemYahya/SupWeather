const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/supweather', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to database");
});
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,// limit each IP to 100 requests per windowMs
    delayMs: 0
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "Pa$$w0rd",
    resave: false,
    saveUninitialized: true
}));
app.use(cors());
app.use(helmet());

app.use('/', indexRouter);


module.exports = app;
