//===================================================
// Structure
//===================================================
/**
 * index:       a source for all things user model related
 * controller:  a list of function with which to interface
 *                with a user model (endpoints)
 * schema:      a layout of what data a user consists of
 * model:       an interface with which to act upon a user model
 *               i.e. its methods,hooks,functions or any non stored data      
 */


//===================================================
// Modules
//===================================================
const controller          = require("./controller");
const model               = require("./model");
const schema              = require("./schema");

//===================================================
// Exports
//===================================================
module.exports = {
  model : model,
  schema : schema,
  controller : controller
}
