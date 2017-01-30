//===================================================
// Modules
//===================================================
var router            = require('express').Router();

//===================================================
// Components
//===================================================
var permissions    = require('../components/permissions');

//===================================================
// Controlles
//===================================================
var controller        = require('../models/user/controller');

//===================================================
// Routes
//===================================================

router.route('/test/ping')
  .get(function(req,res){ res.send("hello")});

router.route('/test/remove/:email')
  .get(controller.remove);



/**
 *  Register a new user into the database
 *  Endpont: /register
 *  POST:
 *    {
 *      username
 *      password
 *      email
 *      securityQuestion
 *      securityAnswer
 *    }
 */
router.route('/register')
  .post(controller.register);

/**
 * POST a profile picture or GET a profile picture for currently logged in user
 * Endpoint: /profile-picture
 * GET:
 *
 *
 *
 */


//===================================================
// Exports
//===================================================

module.exports = router;
