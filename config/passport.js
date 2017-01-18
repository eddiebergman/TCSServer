//===================================================
// Modules
//===================================================
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;

//===================================================
// User Model
//===================================================
var User                = require('../model/user-model.js');

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

  var store = {
    id : user.id,
    permission : user.permission
  }

  callback(null , store);
});

passport.deserializeUser( function(store, callback) {
  callback(null, store);
});

//===================================================
// Exports
//===================================================
module.exports = passport;
