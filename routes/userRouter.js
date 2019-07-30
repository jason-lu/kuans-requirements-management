'use strict'

const express = require('express')
const router = express.Router({mergeParams:true})
const user = require('../controllers/userController')



router.post('/find',(req,res) => {
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

module.exports = {
    userRouter: router
}