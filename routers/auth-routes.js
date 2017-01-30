//===================================================
// Modules
//===================================================
var router              = require('express').Router();

//===================================================
// Components
//===================================================
var permissions         = require('../components/permissions');

//===================================================
// Controller
//===================================================
var controller          = require('../components/auth-controller');

//===================================================
// Endpoints
//===================================================

/**
 *  Log in and obtain a session-cookie
 *  Endpoint: /login
 *  POST:
 *    {
 *       email
 *       password
 *    }
 */
 router.route('/login')
  .post(controller.login);

/**
 * Log out from a session using the session id stored in the cookie
 *  GET:
 */
 router.route('/logout')
  .get(permissions.isLoggedin, controller.logout);

//===================================================
// Exports
//===================================================
module.exports = router;
