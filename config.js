//===================================================
// Configs
//===================================================
var config = module.exports;

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
