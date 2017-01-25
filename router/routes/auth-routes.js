//===================================================
// Modules ext
//===================================================
var router        = require('express').Router();

//===================================================
// Modules local
//===================================================
var authMiddleware          = require('../../auth').middleware;

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
  .get(authMiddleware.isLoggedin, controller.logout);

//===================================================
// Exports
//===================================================
module.exports = router;
