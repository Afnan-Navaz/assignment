const express =  require('express');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const {MONGO_URL, ORIGIN} = require('../config');

const setup = (app) => {
    mongoose.connect(MONGO_URL, { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify:true,
        useCreateIndex: true 
    })
    .then(() => console.log('connected to mongodb'))
    .catch(() => console.log('cannot connect to mongodb'));
    app.use(cors({
        origin: ORIGIN,
        credentials: true,
      }));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(session({
        saveUninitialized: true,
        resave: false,
        secret: "secrect",
        cookie: { secure: false }
    }));
    app.use(morgan('dev'));
}

module.exports = setup;