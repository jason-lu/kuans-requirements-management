'use strict'
const db = require('../db').User


function getUser(email) {
    db.findOne({email})
}