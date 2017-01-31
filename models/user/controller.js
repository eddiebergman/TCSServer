//===================================================
// Models
//===================================================
var User            = require('./model');

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

  var expectedKeys = [
    'username',
    'password',
    'email',
    'securityQuestion',
    'securityAnswer'
  ];

//TODO make this append them all and then send
  for(var key in expectedKeys){
    if(!req.body.hasOwnProperty(expectedKeys[key]))
      return res.status(400).send("Must provide " + expectedKeys[key]);
  }

  //TODO temp
  var date = new Date();
  if(req.body.dob) date = Date.parse(req.body.dob);


  var user = {
    username          : req.body.username,
    password          : req.body.password,
    dob               : date, //TODO temp
    email             : req.body.email,
    securityQuestion  : req.body.securityQuestion,
    securityAnswer    : req.body.securityAnswer
  }

  User.create(user , callback);

  function callback(err, user){
    if(err) return res.status(400).send(err.message);
    //TODO temporary , removeonce dob enforced
    if(!req.body.dob) return res.status(200).send("ERROR: user was registered but please provide a 'dob' , this will soon be mandatory");
    return res.status(200).json(user);
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
  User.destroy({ 'email' : emailValue }, callback);

  //TODO remove the user from session if logged in

  function callback(err , message){
    if(err) return res.status(500).send(err);
    return res.status(200).json(message);
  }

}


//===================================================
// Exports
//===================================================
module.exports = {
  register  : register,
  remove    : remove,
}
