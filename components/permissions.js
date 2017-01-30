//==================================================
// Setup
//===================================================

var permissions = {};

/**
 * The different permission levels administered to users
 */
permissions.levels = {
  unverified  : 0,
  verified    : 1,
  moderator   : 2,
  admin       : 3
}


/**
 * Function desc.
 */
permissions.isPermitted = function(permissionLevel) {

  return function(req, res, next){
    if (req.user.permission < permissionLevel){
        return res.send(403).send("You do not have the correct permission for this");
    }

    return next();
  }

}

/**
 * Function desc.
 */
permissions.isLoggedin = function(req, res, next){

    if (!req.isAuthenticated())
      return res.set(401).send("You must be logged in")

    return next();

}

//===================================================
// Exports
//===================================================
module.exports = permissions;
