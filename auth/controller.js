//===================================================
// Modules
//===================================================
var passport              = require('./passport');

//===================================================
// EndPoints
//===================================================

/**
 * Logs a user in, giving them a cookie and setting up a session
 *  HTTP Codes:
 *    500 : error occured server side
 *    404 : user/pass combo not found , login failed
 *    200 : login succesfull
 */
function login(req, res){

  if(req.isAuthenticated()){
    return res.set(200).send("You have are already logged in");
  }

  passport.authenticate('local', handleAuthentication)(req, res);

  function handleAuthentication(err, user, info){
    console.log(err);
    if(err)   return res.set(500).send(err);
    if(!user) return res.set(404).send("No matching email and password found"); //TODO TEMP 404 and error message
    req.login(user, handleLogin);
  }

  function handleLogin(err){
    if(err) return res.set(500).send(err);
    return res.set(200).send("Login succesfull");
  }

}


/**
 * Log a user out, deleting their session
 *  HTTP Codes:
 *    200 : You have been logged out (whether logged in or not)
 */
function logout(req, res){

  if(req.isAuthenticated()){
    req.logout();
    req.session.destroy();
  }

  res.set(200).send("Logged Out")

}

//===================================================
// Exports
//===================================================
module.exports = {
  login : login,
  logout : logout
}
