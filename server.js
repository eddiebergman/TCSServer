//===================================================
// Modules
//===================================================
var cors          = require('cors');
var mongoose      = require('mongoose');
var express       = require('express');
var bodyParser    = require('body-parser');
var path          = require('path');
var session       = require('express-session');
var MongoStore    = require('connect-mongo')(session);

//===================================================
// Configs
//===================================================
var db            = require('./config/database');
var passport      = require('./config/passport')

//===================================================
// Routers
//===================================================
var routesUser    = require('./route/user-routes');
var routesAuth    = require('./route/auth-routes');

//===================================================
// App configuration
//===================================================
var port = process.env.PORT || 8080;

var app = express();

db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret : "helloworld", //TODO move securely
    resave : false,
    saveUninitialized : false,
    store: new MongoStore({
       mongooseConnection : mongoose.connection,
       ttl: 2*24*60*60
     })
}));

app.use(passport.initialize());
app.use(passport.session());

//===================================================
// Router Mounting
//===================================================
app.use('/api/user', routesUser);
app.use('/api/auth', routesAuth);

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
