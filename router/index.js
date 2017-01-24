//===================================================
// Router Modules
//===================================================
var routesUser        = require("./routes/user-routes.js");
var routesAuth        = require("./routes/auth-routes.js");

//===================================================
// Exports
//===================================================
module.exports = {
  userRoutes : routesUser,
  authRoutes : routesAuth
}
