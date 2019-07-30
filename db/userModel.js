'use strict'
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true
    },
    userGroup: String
})

let userModel = mongoose.model('user',UserSchema)

module.exports = {
    userModel
}