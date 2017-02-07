//===================================================
// Modules
//===================================================
var router              = require('express').Router();
var multer              = require('multer');
//===================================================
// Components
//===================================================
var permissions         = require('../components/permissions');
var upload              = multer({dest: '../public/images/'});

//===================================================
// Controlles
//===================================================
var controller          = require('../models/user/controller');

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
 *      dob
 *      email
 *      securityQuestion
 *      securityAnswer
 *    }
 */
router.route('/register')
  .post(controller.register);

router.route('/picture')
  .post(permissions.isLoggedin, upload.single('picture'), controller.setPicture)

router.route('/picture/:userid')
  .get(controller.getPicture)
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
