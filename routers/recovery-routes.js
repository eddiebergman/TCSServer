//===================================================
// Modules
//===================================================
var router              = require('express').Router();

//===================================================
// Controller(s)
//===================================================
var controller          = require('../components/controllers/recovery-controller');

//===================================================
// Routes
//===================================================

/**
 * Gets the security questions that are available
 */
 router.route('/questions')
  .get(controller.getSecurityQuestion);

//===================================================
// Exports
//===================================================
module.exports = router;
