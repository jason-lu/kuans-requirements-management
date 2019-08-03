'use strict'
const db = require('../db').User
const brypt = require('bcrypt')
const saltRounds = 10


function getUser(email,cb) {
    db.findOne({email},'userName, email, userGroup',(err,user) => {
        if(err) return cb(err,null)
        return cb(null,user)
    })
}

function addUser(user,cb) {

    //Generate hash
    brypt.genSalt(saltRounds, (err,salt) => {
        if(err) return cb(err,null)
        //Hash plain password
        brypt.hash(user.password, salt, (err,hash) => {
            if(err) return cb(err,null)
            user.password = hash
            const userModel = new db(user)
            //save to db
            userModel.save(user, (err, dbUser) => {
                if(err) return cb(err,null)
                return cb(null, dbUser)
            })
        })
    })
}

function verify(user,cb){
    db.findOne({email:user.email}, (err, realUser) => {
        if(err) return cb(err,null,null)
        if(!realUser) return(null, {msg:"Incorrect email/password"},null)
        brypt.compare(user.password, realUser.password, (err,res) => {
            if(res) return cb(null,null, realUser)
            let finalUser = (({id,email, userName, userGroup}) =>({id,email, userName, userGroup}))(realUser)
            cb(null, null, finalUser)
        })
    })
}

module.exports = {
    getUser,
    addUser,
    verify
}