//===================================================
// Modules
//===================================================
var mongoose        = require('mongoose');

//===================================================
// Components
//===================================================
var permissions     = require('../../components/permissions');

//===================================================
// Schema
//===================================================
const Schema = mongoose.Schema;

var levels = permissions.levels;

var UserSchema = new Schema({

  username:   {type: String, required: true, unique: true},
  password:   {type: String, required: true},

  email:      {type: String, required: true, unique: true},

  permission: { type: Number, required: true, min: levels.unverified, max: levels.admin, default: levels.unverified},

  firstName : {type: String},
  lastName  : {type: String},
  dob       : {type: Date, required: true},

  picURL: {type: String},

  securityQuestion : {type: String, required: true},
  securityAnswer   : {type: String, required: true}

});

//===================================================
// Exports
//===================================================
module.exports = UserSchema;
