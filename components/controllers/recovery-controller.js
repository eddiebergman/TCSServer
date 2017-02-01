//===================================================
// Modules
//===================================================

//===================================================
// Resources
//===================================================
var questions         = require('../../resources/security-questions');

//===================================================
// End Points
//===================================================

var controller = {}

/**
 * TODO controller description recovery-controller
 */
controller.getSecurityQuestion = function(req, res) {
  res.set(200).send(questions);
}

//===================================================
// Exports
//===================================================
module.exports = controller;
