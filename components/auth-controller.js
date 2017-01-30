//===================================================
// Modules
//===================================================
var passport              = require('passport');

//===================================================
// EndPoints
//===================================================
var controller = {};

/**
 * Logs a user in, giving them a cookie and setting up a session
 *  HTTP Codes:
 *    500 : error occured server side
 *    404 : user/pass combo not found , login failed
 *    200 : login succesfull
 */
controller.login = function (req, res){

  //handles authenticate callback
  function authenticateCallback(err, user, info){
    if(err)   return res.set(500).send(err);
    if(!user) return res.set(404).send("No matching email and password found");
    req.login(user, loginCallback);
  }

  //handles login callback
  function loginCallback(err){
    if(err) return res.set(500).send(err);
    return res.set(200).send("Login succesfull");
  }

  if(req.isAuthenticated()){
    return res.set(200).send("You have are already logged in");
  }

  passport.authenticate('local', authenticateCallback)(req, res);

}


/**
 * Log a user out, deleting their session
 *  HTTP Codes:
 *    200 : You have been logged out (whether logged in or not)
 */
controller.logout = function(req, res){

  if(req.isAuthenticated()){
    req.logout();
    req.session.destroy();
  }

  res.set(200).send("Logged Out")

}

//===================================================
// Exports
//===================================================
module.exports = controller;
