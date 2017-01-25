//===================================================
// Modules
//===================================================
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;

//===================================================
// User Model
//===================================================
var User                = require('../user').model;

//===================================================
// Strategy
//===================================================
var options = {
  usernameField: 'email',
  passwordField: 'password',
  session: true
}

function authenticate(email, password, done){
  User.findOne( { 'email' : email} )
  .exec(function(err , user) {
    if (err)                            return done(err);
    if (!user)                          return done(null, false);
    if (!user.verifyPassword(password)) return done(null , false);
    return done(null , user);
  });
}

passport.use(new LocalStrategy(options, authenticate));

//===================================================
// Serialize / Deserialize
//===================================================


passport.serializeUser( function(user,callback) {

  var sessionUser = { //this is what will be put in session storage
    _id : user._id,
    email : user.email,
    username : user.username,
    permission : user.permission
  }
  callback(null , sessionUser);
});

passport.deserializeUser( function(sessionUser, callback) {
  callback(null, sessionUser);
});

//===================================================
// Exports
//===================================================
module.exports = passport;
