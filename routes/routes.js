const express = require('express');
const router = express.Router();

const Users = [];

router.get('/', (req, res) => {
    res.render('form');
});

router.post('/', (req, res) => {
    if (!req.body.userName || !req.body.password) {
        res.status('400');
        res.send('invalid  details!');
    } else {
        Users.filter((user) => {
            if (user.userName == req.body.userName) {
                res.render('/', {
                    message: 'The user already exists'
                })
            }
        });

        const newUser = {userName: req.body.userName, password: req.body.password}

        Users.push(newUser);
        req.session.user = newUser;

        res.redirect('/user_page');
    }
});

function userLoggedIn(req, res, next) {
    if (req.session.user)
        next();
    else {
        const err = new Error('Not Logged in!');
        console.log(req.session.user);
        next(err);
    }
}

router.get('/user_page', userLoggedIn, (req, res) => {
    res.render('user_page', {userName: req.session.user.userName});
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    if (!req.body.userName || !req.body.password) {
        res.render('login', {message: 'enter username and password'})
    } else {
        Users.filter((user) => {
            if (user.userName === req.body.userName && user.password === req.body.password) {
                req.session.user = user;
                res.redirect('/user_Page');
            } 
        });
        res.render('login', {message: 'Invalid Credentials'});
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('user logged out');
    })
    res.redirect('/login')
});

module.exports = router;