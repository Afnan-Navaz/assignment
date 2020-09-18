const express =  require('express');
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const sessionsetup = session({
    saveUninitialized: true,
    resave: false,
    secret: "secrect",
    cookie: { secure: false }
});

const setup = (app) => {
    mongoose.connect(process.env.MONGO_URL, { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify:true,
        useCreateIndex: true 
    })
    .then(() => console.log('connected to mongodb'))
    .catch(() => console.log('cannot connect to mongodb'));
    app.use(cors({
        origin: process.env.ORIGIN,
        credentials: true,
      }));
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(sessionsetup);
    app.use(morgan('dev'));
}

module.exports = {setup, sessionsetup};