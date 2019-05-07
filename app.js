import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import mongoose from 'mongoose'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import config from './config'
import {getMongoURL} from './utils'

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
console.log("\n**** USING CONFIGURATIONS ****\n")
console.log(config.toString())

mongoose.connect(getMongoURL(config.get('db.host'), config.get('db.name'), config.get('db.username'), config.get('db.password')), {useNewUrlParser:true, useFindAndModify:false, useCreateIndex:true});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    success:false,
    message:err.message,
    status:err.status
  })
});

module.exports = app;
