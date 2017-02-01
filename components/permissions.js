//===================================================
// Resources
//===================================================
var levels            = require('../resources/permission-levels')

//==================================================
// Setup
//===================================================

var permissions = {};

/**
 * Attacahing permission levels which are described in 'resources/permission-levels'
 */
permissions.levels = levels;

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
