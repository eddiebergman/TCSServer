//===================================================
// Modules
//===================================================
var mongoose    = require('mongoose');

//===================================================
// Setup
//===================================================
const connection = mongoose.connection;

/**
* Hook: logs success or failure of connection to mongoDB
 */
connection.once('open', function(err){
  if(err) throw err;
  //logger.log('info', `Connected to -> ${config.uri}`);
})

/**
 * Starts the connection to the mongoDB database
 */
function connect(options){

  if(!options.uri || !options.poolSize){

    throw new Error("Please provide a uri and poolSize for mongodb connection")

  }else{

    mongoose.connect(`${options.uri}?poolSize=${options.poolSize}`);
    return connection;
  }
}

//===================================================
// Exports
//===================================================
module.exports = connect;
