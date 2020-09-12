const express = require('express');
const isLogged = require('../middlewares/isLogged');
const {all, like, newpost} = require('../controllers/post-controll');
const route = express.Router();

route.get('/all', all);
route.post('/like', isLogged, like);
route.post('/new', isLogged, newpost);

module.exports = route;