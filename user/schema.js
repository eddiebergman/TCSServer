//===================================================
// Modules ext
//===================================================
var mongoose = require("mongoose");

//===================================================
// Modules local
//===================================================

// var permissions = require("../auth").permissions;
const permissions = { //TODO fix the fact it seems blank when running above code
  unverified  : 0,  //Seems to be something to do with load order of the modules
  verified    : 1,
  moderator   : 2,
  admin       : 3
}

//===================================================
// Schema
//===================================================
var Schema = mongoose.Schema;
var UserSchema = new Schema({

  username:   {type: String, required: true, unique: true},
  password:   {type: String, required: true},

  email:      {type: String, required: true, unique: true},

  permission: { type: Number, required: true, min: permissions.unverified, max: permissions.admin, default: permissions.unverified},

  firstName : {type: String},
  lastName  : {type: String},
  age       : {type: Number},

  picURL: {type: String},

  securityQuestion : {type: String, required: true},
  securityAnswer   : {type: String, required: true}

});

//===================================================
// Exports
//===================================================
module.exports = UserSchema;
