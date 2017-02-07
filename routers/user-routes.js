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
  .post(permissions.isLoggedin, upload.single('picture'), controller.setPicture);

router.route('/picture/:userid')
  .get(controller.getPicture);

//handle getting friends , either logged in user or of the person
router.route('/friend/:userid?')
  .get(function(req,res){
    var resp = (req.params.userid? req.params.userid : "nothing");
    var extra = req.query.limit? req.query.limit : "no limit"
    return res.send(resp + extra);
  })

router.route('/friend/request')
  .get(controller.getFriendRequests) //get logged in users friend requests
  .post(controller.sendFriendRequest); //send a friend request to each - body { user : [id1, id2]}

router.route('friend/request/status')
  .get(controller.getPendingFriendRequests) //get logged in uses requests sent to others
  .post(controller.respondToFriendRequest); //respond to friend request - body { user: id1, status : accept/blocked/ignore/decline }

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
