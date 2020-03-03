const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const passport = require('passport')
require('./server/databaseConnection')
const route = require('./server/routes')
require('dotenv').config()
// require('express-async-errors');
const { initDbConnection } = require('./server/databaseConnection')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());
app.use(passport.initialize());

app.use('/api', route);


global.clientConnection = initDbConnection();
global.appRoot = path.resolve(__dirname);


app.listen(4000, () => {
    console.debug('server running on port 4000')
})
