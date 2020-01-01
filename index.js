import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'
import cors from 'cors'
import passport from 'passport'
import './server/databaseConnection'
import route from './server/routes'
require('dotenv').config()
// require('express-async-errors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());



app.use('/api', route);

// app.use((error, req, res, next) => {
//     console.log('error ----', error);
//     res.status(req.status || 500).send({
//       message: error.message,
//       stack: error.stack
//     });
//   });

app.listen(4000, () => {
    console.debug('server running on port 4000')
})
