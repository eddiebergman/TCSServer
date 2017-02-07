//===================================================
// Modules
//===================================================
var EventEmitter = require('events').EventEmitter;
var path         = require('path');
var fs           = require('fs');

//===================================================
// Config
//===================================================
var config       = require('../../config');

//===================================================
// Models
//===================================================
var User         = require('./model');

//===================================================
// Endpoints
//===================================================

var controller = {};
var events = new EventEmitter();
controller.events = events;

/*
 * Registers a user
 *  HTTP Codes:
 *    400 : malformed JSON body
 *    200 : successfully registered user
 */
controller.register = function(req, res){

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
  var date = req.body.dob? req.body.dob : Date.parse(req.body.dob);

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
    res.status(200).send(user)
    events.emit('registered', user);
  }

}


/**
 * Removes a user
 *  HTTP Codes:
 *    500 : An error was raised during server side ops
 *    200 : user successfully removed
 */
controller.remove = function(req, res){

  var emailValue = req.params.email;
  User.destroy({ 'email' : emailValue }, callback);

  //TODO remove the user from session if logged in

  function callback(err , message){
    if(err) return res.status(500).send(err);
    return res.status(200).json(message);
  }

}

controller.getPicture = function(req, res){
  User.findById(req.params.userid)
    .exec(callback);

  function callback(err, user){
    if(err) return res.send(err);
    if(!user) return res.send("No user");

    return res.sendFile(path.join(config.core.IMAGE_DIR, user.picURL));

  }
}

controller.setPicture = function(req, res){
  User.findById(req.user._id)
    .exec(callback);

  function callback(err, user){
    if(err) return res.send(err);
    if(!user) return res.send("No user");

    var filename = user.id + path.extname(req.file.originalname);

    fs.rename(req.file.path, config.core.IMAGE_DIR + filename, function(err){
      if(err) return res.send(err);
      user.picURL = filename;
      user.save( function(err ,resp){
        if(err) return res.send(err);
        return res.send(resp);
      });
    });
  }
}



//===================================================
// Exports
//===================================================
module.exports = controller;
