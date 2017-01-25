//===================================================
// Modules ext
//===================================================
var mongoose            = require('mongoose');
var bcrypt              = require('bcryptjs');
var path                = require('path');
var fs                  = require('fs');

//===================================================
// Modules local
//===================================================
var UserSchema              = require('./schema');
var permissions             = require()

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
  var user = new this();

  for(var property in userData){
    if(UserSchema.paths.hasOwnProperty(property)){
      user[property] = userData[property];
    } else {
      var err = new Error("User Schema has no property : " + property);
      return callback(err);
    }
  }

  user.save(function(err, user){
    callback(err, user)
  });

}


/**
 * Deletes a user from the database by the given keyValuePair
 * Params:
 *  keyValuePair - a keyValuePair from which to retrieve a user by
 * Callback
 *  err - error if one occurs
 *  message - message of success
 */
function destroy(keyValuePair, callback){
  if( !(keyValuePair.hasOwnProperty('id') || keyValuePair.hasOwnProperty('email')) ){
    return callback(new Error("Invalid key for retrieving user to remove"));
  }


  this.findOneAndRemove(keyValuePair , function(err , result){
      if(err) return callback(err);
      if(!result) return callback(null, "No match found")
      return callback(null, result);
    })
}

//===================================================
// Methods
//===================================================


/**
 * Can only be referenced from a user object, updates all users user[key] with updates[key]
 * Retrieves the object from the database so verification can be done on fields
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

//===================================================
// Attach Statics & Methods
//===================================================

UserSchema.methods.verifyPassword = verifyPassword;
UserSchema.methods.update = update;
UserSchema.statics.create = create;
UserSchema.statics.destroy = destroy;
//===================================================
// Exports
//===================================================
module.exports = mongoose.model('User' , UserSchema);;
