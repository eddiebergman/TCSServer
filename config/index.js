//===================================================
// Structure
//===================================================
/*
Different configs are accessed through this file, the index.
Normally, configs will contain constants or determine runtime
variables that may differ depending on deployment
*/


//===================================================
// Modules
//===================================================
var mongoDB          = require('./mongoDB-config');
var session          = require('./session-config');
var winston          = require('./winston-config')

//===================================================
// Exports
//===================================================
module.exports = {
  mongoDB : mongoDB,
  session : session,
  winston : winston
}
