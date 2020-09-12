const express = require('express');
const {sign, login, logout, cred} = require('../controllers/user-controll');
const route = express.Router();

route.post('/sign', sign);
route.post('/login', login);
route.get('/logout', logout);
route.get('/cred', cred);

module.exports = route;