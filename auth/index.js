//===================================================
// Modules
//===================================================
var controller    = require("./controller");
var middleware    = require("./middleware");
var passport      = require("./passport");
var permissions   = require("./permissions");

//===================================================
// Exports
//===================================================
module.exports = {
  controller : controller,
  middleware : middleware,
  passport : passport,
  permissions : permissions
}
