const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sign = async (req, res) => {
    try{
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: password
            });
        req.session.userid = user._id;
        // const userID = jwt.sign(user._id, process.env.JWT);
        res.send({
            username: user.username,
            email: user.email,
            id: user._id
        });
    }catch(e){
        res.status(500).send(e);
    }
}

const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        const pword = await bcrypt.compare(req.body.password, user.password);
        if(pword){
            req.session.userid = user._id;
            // const userID = jwt.sign(user._id, process.env.JWT);
            res.send({
                username: user.username,
                email: user.email,
                id: user._id
            });
        }else{
            res.status(400).send('incorrect password');
        }
    }catch(e){
        res.status(500).send(e);
    }
}

const logout = (req, res) => {
    req.session.destroy();
    res.send('session destroyed');
}

const cred = async (req, res) => {
    try{
        if(req.session.userid){
            const user = await User.findById(req.session.userid).select('username email');
            res.send(user);
        }
        else{
            res.status(400).send('not logged in');
        }
    }catch(e){
        res.status(500).send(e);
    }
}

module.exports = {sign, login, logout, cred};