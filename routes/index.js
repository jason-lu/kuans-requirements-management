'use strict'
const express = require('express')
const router = express.Router({mergeParams:true})

router.post('/users',(req,res) => {
    let user = req.body.user;
    res.send(`Hello ${user.name}`)
})


module.exports = router;