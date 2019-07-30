'use strict'

const express = require('express')
const app = express();
const port = 8888
const bodyParser = require('body-parser');
//config file
const config = require('./config')
const db = require('./db');
//routing
let apiRouter = require('./routes')

db.connect(config.getConfig().dbConfig.finalUrl)

app.use(bodyParser.json())
app.use('/api',apiRouter)

app.use('/',(_,res) => {
    res.json({msg:"hello"})
})

app.listen(port, () => {
    console.log(`App is running at ${port}`);
    
})