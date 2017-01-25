//===================================================
// Modules
//===================================================
var mongoose    = require('mongoose');
var config      = require('../config').mongoDB;
var logger      = require('../logger').logger;

//===================================================
// Setup
//===================================================
const connection = mongoose.connection;

/**
* Hook: logs success or failure of connection to mongoDB
 */
connection.once('open', function(err){
  if(err) throw err;
  logger.log('info', `Connected to -> ${config.uri}`);
})

/**
 * Starts the connection to the mongoDB database
 */
function connect(){
  mongoose.connect(`${config.uri}?poolSize=${config.poolSize}`);
}

/**
 * Returns a connection to the mongoDB
 */
function getConnection(){
  return connection;
}

//===================================================
// Exports
//===================================================
module.exports = {
  connect : connect,
  connection : getConnection
}
