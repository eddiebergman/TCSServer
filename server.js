//===================================================
// External Modules
//===================================================
var express       = require('express');
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var path          = require('path');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);
var cors          = require('cors');

//===================================================
// Local Modules
//===================================================
var auth          = require("./auth");
var mongoDB       = require('./mongoDB');
var router        = require("./router");

//===================================================
// Config
//===================================================
var config      = require('./config/index')
//===================================================
// App configuration
//===================================================
var port = process.env.PORT || 8080;
var app = express();

//TODO find out where to put session stuff (does not fill well into confg
// works better as model, either auth or its own)
var sessionStore = new MongoStore({
  mongooseConnection : mongoDB.connection(),
  ttl: 2*24*60*60
});

var sessionConfig = {
  secret : config.session.secret,
  resave : false,
  saveUninitialized : false,
  store: sessionStore
}

mongoDB.connect();

//app.use(static) TODO place it here , express wil serve cookies if placed later

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionConfig));

app.use(auth.passport.initialize());
app.use(auth.passport.session());

//===================================================
// Router Mounting
//===================================================
app.use('/api/user', router.userRoutes);
app.use('/api/auth', router.authRoutes);

//===================================================
// Initialization
//===================================================
app.listen(port);
console.log("Listening .....");

//===================================================
// Exports
//===================================================
exports = module.exports = {
  app : app
}
