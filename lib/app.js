var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));

app.use('/', require('./routes/index'));
app.use('/buffers', require('./routes/buffers'))
app.use('/ismds/stream-json', require('./routes/ismds-stream-json'))
app.use('/jsonparse', require('./routes/jsonparse'))
app.use('/parsed', require('./routes/parsed'))
app.use('/raw', require('./routes/raw'))
app.use('/stream-json', require('./routes/stream-json'))
app.use('/users', require('./routes/users'));

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
  res.render('error');
});

module.exports = app;
