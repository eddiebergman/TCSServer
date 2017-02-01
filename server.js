//===================================================
// Modules
//===================================================
var express       = require('express');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var path          = require('path');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);
var cors          = require('cors');
var winston       = require('winston');

//===================================================
// Config
//===================================================
var config      = require('./config');

//===================================================
// Components
//===================================================
var mongodb       = require('./components/mongodb')(config.mongodb);
var passport      = require('./components/passport');
var requestLogger = require('./components/request-logger');
var responseLogger= require('./components/response-logger');

//===================================================
// Routers
//===================================================
var userRouter    = require('./routers/user-routes');
var authRouter    = require('./routers/auth-routes');
var recoveryRouter= require('./routers/recovery-routes');

//===================================================
// App Setup Config
//===================================================
var app = express();

var sessionStore = new MongoStore({
  mongooseConnection : mongodb,
  ttl: 2*24*60*60
});

var sessionOptions = {
  secret : config.session.secret,
  resave : false,
  saveUninitialized : false,
  store: sessionStore
}

winston.level = config.winston.logLevel;
mongoose.Promise = global.Promise; //gets rid of mongoose warning and uses default Promise library

//===================================================
// Middleware mounting
//===================================================
//app.use(static) TODO place it here , express wil serve cookies if placed later

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(responseLogger.basic(true));
app.use(requestLogger.basic());
//===================================================
// Router Mounting
//===================================================
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/recovery', recoveryRouter);

//===================================================
// Initialization
//===================================================
app.listen(config.server.port);
console.log("Listening .....");

//===================================================
// Exports
//===================================================
module.exports = app;
