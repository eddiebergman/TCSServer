  //===================================================
// Modules ext
//===================================================
var mongoose            = require('mongoose');
var bcrypt              = require('bcryptjs');
var path                = require('path');
var fs                  = require('fs');

//===================================================
// Internal Configs
//===================================================
var permissions = {
  unverified  : 0,
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

  permission: { type: Number, required: true, min: 0, max: permissions.admin, default: permissions.unverified},

  personalInfo: {
    firstName : {type: String},
    lastName  : {type: String},
    age       : {type: Number}
  },

  profilePicPath: {type: String},

  security : {
    question : {type: String, required: true},
    answer   : {type: String, required: true},
  },

  verificationToken :{type: String, unqiue: true},

  //Password Reset, if one exists, there must be expiration and token
  passwordReset : {
    expires : {type : String, required: true},
    token   : {type : String, required: true}
  },

  //friend info
  friends:    [{
    id        : {type: Schema.Types.ObjectId, required: true},
    username  : {type: String, required: true},
    email     : {type: String, required: true}
  }],

  friendRequests: [{
    date      : {type: Date, required:true},
    requestee : {type: String, required:true},
    requester : {type: String, required:true},
    isAccepted: {type: Boolean, required:true}
  }],

  rivalries:  [{type: Schema.Types.ObjectId}],

  //game info
  leagues:    [{type: Schema.Types.ObjectId}],

  favourites: [{type: Schema.Types.ObjectId}],
  created:    [{type: Schema.Types.ObjectId}],

  highscores: [{
    gameId :    {type: Schema.Types.ObjectId, required: true},
    leagueId:   {type: Schema.Types.ObjectId, required: true},
    score:      {type: Number, required: true},
    date:       {type: Date, required: true}
  }],

  events: [{type: Schema.Types.ObjectId}],

  notifications:  [{
    body:       {type: String, required: true},
    date:       {type: Date, required: true}
  }]

});

//===================================================
// functions
//===================================================

/**
 *  Hashes a password before returning the result to a callback
 *  Params:
 *    password      : password string
 *  Callback:
 *    err           : error
 *    result        : encrypted password
 */
function hashPassword(password, callback){
  bcrypt.genSalt(10, function(err, salt){
    if(err) callback(err);
    bcrypt.hash(password, salt, callback);
  });
}

//===================================================
// eventListeners
//===================================================

/**
 * Hashes a password before it gets saved
 */
UserSchema.pre('save', function(next){
  var user = this;

  if (!user.isModified('password')) return next();
  hashPassword(user.password, function(err, hash){
    if(err) throw err;
    else user.password = hash;
    return next();
  });

});

//===================================================
// Statics
//===================================================

/**
 * Creates a new user in the database
 *  Params:
 *    userData - json object that complies with '/register' route
 *  Callback:
 *    err     - any error that occured
 *    user    - the user created if no error occursUyser
 */
function create(userData, callback){
  var user = new User();

  for(var property in userData){
    if(UserSchema.paths.hasOwnProperty(property)){
      user[property] = userData[property];
    } else {
      console.log(UserSchema.paths);
      var err = new Error("User Schema has no property : " + property);
      return callback(err);
    }
  }

  user.save(function(err, user){
    //TODO process error here if needed
    callback(err, user)
  });

}
UserSchema.statics.create = create;


/**
 * Deletes a user from the database by the given keyValuePair
 * Params:
 *  keyValuePair - a keyValuePair from which to retrieve a user by
 * Callback
 *  err - error if one occurs
 *  message - message of success
 */
function destroy(keyValuePair, callback){

  if(!keyValuePair.hasOwnProperty('id') && !keyValuePair.hasOwnProperty('email'))
    return callback(new Error("Invalid key for retrieving user to remove"));

  User
    .findOneAndRemove(keyValuePair , function(err , result){
      if(err) return callback(err);
      return callback(null, result);
    })
}
UserSchema.statics.destroy = destroy;

//===================================================
// Methods
//===================================================


/**
 * Can only be referenced from a user object, updates all users user[key] with updates[key]
 * Params:
 *  updates - JSON object of all updatse to apply, errors if does not exist
 * Callback
 *  err - error if one occurs
 *  user - modified user if needed
 */
function update(updates, callback){
  var user = this;

  for (var key in updates) {
    if (UserSchema.paths.hasOwnProperty(key))
      user[key] = updates[key];
    else
      return callback(new Error("No such field in UserSchema => " + field));
  }
  return callback(null, user);
}
UserSchema.methods.update = update;

/**
 * verifies a given password against [this] user's password
 * Params:
 *  password      : password string
 * Returns:
 *  boolean       : verification results
 */
function verifyPassword(password){
  return bcrypt.compareSync(password, this.password);
}
UserSchema.methods.verifyPassword = verifyPassword;

//===================================================
// Model
//===================================================
var User = mongoose.model('User' , UserSchema);

User.permissions = permissions;

//===================================================
// Exports
//===================================================
module.exports = User;
