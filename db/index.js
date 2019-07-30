'use strict'

const mongoose = require('mongoose')
const User = require('./userModel').userModel;


function connect(url) {
    console.log(url)
    mongoose.connect(url, {useNewUrlParser: true})
    let db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
        console.log('db connected!')
    })
}

module.exports = {
    connect,
    User
}