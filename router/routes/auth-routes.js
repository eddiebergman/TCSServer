//===================================================
// Modules
//===================================================
var router        = require('express').Router();

//===================================================
// Corresponding Controller
//===================================================
var controller   = require('../../auth').controller;

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
 * Log out from a session using a cookie
 *  GET:
 */
 router.route('/logout')
  .get(controller.logout);

//===================================================
// Exports
//===================================================
module.exports = router;