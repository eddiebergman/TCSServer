//===================================================
// Modules
//===================================================
var winston             = require('winston');
var _                   = require('underscore');

//===================================================
// Setup
//===================================================
var responseLogger = {};

responseLogger.basic = function(auto){

  return function(req, res, next){

    function logResponseHeaders(object){

      var body = (!object || _.isEmpty(object))? "" : "Body:\t"+ object;

      winston.log('debug', `
=Response=============================================
\t\tPath:\t${res.req.method} - ${res.req.originalUrl}
\t\tSource:\t${req.ip}
\t\tStatus:\t${res.statusCode} : ${res.statusMessage}
\t\tHeaders:\t${JSON.stringify(res._headers)}
\t\t${body}
`);

    }

    res.log = logResponseHeaders;

    if(auto){
      res.oldSend = res.send;
      res.send = function(object){
        res.oldSend(object);
        res.log(object);
      }
    }
    return next();

  }

}


//===================================================
// Exports
//===================================================
module.exports = responseLogger;
//when res.send() called
//we need to replace that with something that will log and then actually send
