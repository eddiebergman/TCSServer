//===================================================
// Models
//===================================================
var User            = require('../model/user-model');

//===================================================
// Endpoints
//===================================================


/*
 * Registers a user
 *  HTTP Codes:
 *    400 : malformed JSON body
 *    200 : successfully registered user
 */
function register(req, res){

  var expectedKeys = ['username','password','email','securityQuestion','securityAnswer'];

  for(var key in expectedKeys){
    if(!req.body.hasOwnProperty(expectedKeys[key]))
      return res.set(400).send("Must provide " + expectedKeys[key]);
  }

  var user = {
    username : req.body.username,
    password : req.body.password,
    email    : req.body.email,
    security : {
      question  : req.body.securityQuestion,
      answer    : req.body.securityAnswer  
    }
  }

  User.create(user , handle);

  function handle(err, user){
    if(err) return res.set(400).send(err.message);
    return res.set(200).send(user);
  }

}


/**
 * Removes a user
 *  HTTP Codes:
 *    500 : An error was raised during server side ops
 *    200 : user successfully removed
 */
function remove(req, res){

  var emailValue = req.params.email;
  User.destroy({ email : emailValue }, handle);

  function handle(err , message){
    if(err) return res.set(500).send(err);
    return res.set(200).send(message);
  }

}

function getInfo(req, res){





}

//===================================================
// Exports
//===================================================

module.exports = {
  register : register,
  remove : remove
}
