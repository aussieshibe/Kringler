var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//Configure DB
var dbConfig = require('./config/db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

//Configure passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'secretKey'}));
app.use(passport.initialize());
app.use(passport.session());

//Configure flash to store messages in session
var flash = require('connect-flash');
app.use(flash());

//Init passport
var initPassport = require('./passport/init');
initPassport(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup routes
var routes = require('./routes/index.js');
var facebookLoginRoute = require('./routes/login/index.js')(passport);
var homeRoutes = require('./routes/home.js')(passport);
var kringleRoute = require('./routes/kringle.js')();
app.use('/', routes);
app.use('/login/', facebookLoginRoute);
app.use('/home/', homeRoutes);
app.use('/kringle/', kringleRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
