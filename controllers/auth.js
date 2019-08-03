'use strict';
const User = require('./userController')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

let basicStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, function(email, password, cb) {
    User.verify({email,password},(err, msg, user) => {
        if(err) return cb(err)
        if(msg) return (null, false, msg)
        return cb(null,user)
    })
})

passport.use(basicStrategy)