//===================================================
// Configs
//===================================================
var config = module.exports;

config.core = {
  ROOT_DIR : process.env.ROOT_DIR || __dirname + '/',
  IMAGE_DIR : process.env.IMAGE_DIR || __dirname + '/public/images/'
}

config.server = {
  port          : process.env.PORT || 8080
}

config.mongodb = {
  uri           : 'mongodb://localhost:27017/TCS',
  poolSize      :  5
}

config.session = {
  secret        : 'helloworld'
}

config.winston = {
  logLevel      : process.env.LOG_LEVEL || 'debug'
}

config.mailer = {
  service : "ello",
  user: "ello",
  pass: "ello"
}
