'use strict'

const express = require('express')
const router = express.Router({mergeParams:true})
const user = require('../controllers/userController')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const secret = require('../config/index').getConfig().salt

router.get('/find',(req,res) => {
    let email = req.body.email;
    user.getUser(email,(err, user) => {
        if(err) res.status(503).json({msg:'Internal Server Error'})
        res.json(user)
    })

})

router.post('/register',(req,res) => {
    user.getUser(req.body.email,(err,result) => {
        if(err) return 
        if(!result){
            user.addUser(req.body,(err,dbUser) => {
                if(err) res.status(503).json({msg:'Internal Server Err'})
                console.log(dbUser)
                res.json({userName: dbUser.userName, email: dbUser.email, userGroup: dbUser.userGroup})
            })
        } else {
            return res.status(400).json({msg: 'User already exsits!'})
        }
    })
})


router.post('/login',(req,res,next) => {
    passport.authenticate('local',{session:false}, (err, user, info) => {
        if(err || !user) {
            return res.status(403).json({
                msg:"Incorrext username/password"
            })
        }
        req.login(user, {session : false}, (err) => {
            if(err){
                return res.send(err)
            }
            const token = jwt.sign(user, secret);
            return res.json({user, token});
        })
    })(req,res)
})

module.exports = {
    userRouter: router
}