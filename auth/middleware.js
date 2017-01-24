//===================================================
// Modules
//===================================================
var permissions           = require('./permissions');

//===================================================
// Middleware
//===================================================

/**
* Returns a function that can be used as middleware
* that checks if a user has the correct permission level
*/
function isPermitted(permissionSeeked){

  return function(req, res, next){

    if (req.user.permission < permissionSeeked)
    return res.set(403).send("You do not have permission for this");

    return next()

  }

}

/**
 * Checks if a user is logged in
 * Params: req, res, next
 * Failure: send response 401
 * Success: call next()
 */
function isLoggedin(req, res, next){

  if (!req.isAuthenticated())
    return res.set(401).send("You must be logged in")

  return next();

}


/**
 * Checks if a user is at least verified
 * Params: req, res, next
 * Failure: send response 403
 * Success: call next()
 */
function isVerified(req, res, next){

  isPermitted(permissions.verified)(req, res, next);

}


/**
 * Checks if a user is at least moderator
 * Params: req, res, next
 * Failure: send response 403
 * Success: call next()
 */
function isModerator(req, res, next){

  isPermitted(permissions.moderator)(req, res, next);

}


/**
 * Checks if a user is at least admin
 * Params: req, res, next
 * Failure: send response 403
 * Success: call next()
 */
function isAdmin(req, res, next){

  isPermitted(permissions.admin)(req, res, next);

}

//===================================================
// Exports
//===================================================
module.exports = {
  isPermitted   : isPermitted,
  isLoggedin    : isLoggedin,
  isVerified    : isVerified,
  isModerator   : isModerator,
  isAdmin       : isAdmin
}
