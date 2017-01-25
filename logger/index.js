//===================================================
// Modules
//===================================================
var winston       = require('./winston');
var middleware    = require('./middleware');

//===================================================
// Exports
//===================================================
module.exports = {
  logger : winston,
  middleware : middleware
}
