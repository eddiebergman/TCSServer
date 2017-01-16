//Local config files ==============================
//TODO change to non-repo location

var url = 'mongodb://localhost:27017/TCS';
var poolSize = 5;

//modules =========================================

var mongoose = require('mongoose');

//setup ===========================================

var connection = mongoose.connection;

connection.once('open' , function(err){
  if(err) throw err;
  console.log("Connected to -> " + url);
});


//function defs ===================================

function connect(){
  mongoose.connect(url + '?poolSize=' + poolSize);
}

//exports ==========================================

module.exports = {
  url : 'mongodb://localhost:27017/TCS',
  connect : connect
}
