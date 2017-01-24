//===================================================
// Modules
//===================================================
var mongoose    = require('mongoose');
var config      = require('../config/index');

//===================================================
// Setup
//===================================================
const connection = mongoose.connection;

/**
* Hook: logs success or failure of connection to mongoDB
 */
connection.once('open', function(err){
  if(err) throw err;
  //TODO log connection properly
  console.log(`Connected to -> ${config.mongoDB.uri}`);
})

/**
 * Starts the connection to the mongoDB database
 */
function connect(){
  mongoose.connect(`${config.mongoDB.uri}?poolSize=${config.mongoDB.poolSize}`);
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
