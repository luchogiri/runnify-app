// @flow

import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// mongoose.Promise = global.Promise;

const app = express();

if (app.get('env') == 'development') {
  app.use(logger('dev'));
  app.set('views', path.join(__dirname, '../server/views'));
}
else
  app.set('views', path.join(__dirname, '../views'));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// api routes
if (app.get('env') == 'development') {
  app.use('/', express.static(path.join(__dirname, '../web')));
  app.use('*', express.static(path.join(__dirname, '../web/index.html')));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err: Object = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
