//===================================================
// Modules
//===================================================
var router        = require('express').Router();

//===================================================
// Controllers
//===================================================
var controller   = require('../controller/user-controller');

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
 *  General call for single element properties of a user subject to privacy
 *  and/or authentication permissions
 *  GET:
 *    Q-String: ?username=1&firstname=0&permission=1
 */
 router.route('/info/:email')
   .get(controller.getInfo)

//
// /**
//  * Changes the email of the logged in user
//  *  PUT:
//  *    {
//  *      email
//  *    }
//  */
// router.route('/user/change-email')
//   .put(userController.changeEmail);
//


//===================================================
// Exports
//===================================================

module.exports = router;
