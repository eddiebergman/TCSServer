//===================================================
// Modules
//===================================================
var winston             = require('winston');
var _                   = require('underscore');

//===================================================
// Setup
//===================================================
var responseLogger = {};

responseLogger.basic = function(){

  return function(req, res, next){

    var oldEnd = res.end;

    res.end = function (chunk) {
      var body = chunk? "Body:\t" + chunk.toString('utf8') : "";
      logResponseHeaders(body)
      oldEnd.apply(res, arguments);
    };

    return next();

    function logResponseHeaders(body){

      winston.log('debug', `
      =Response=============================================
      \t\tPath:\t${res.req.method} - ${res.req.originalUrl}
      \t\tSource:\t${req.ip}
      \t\tStatus:\t${res.statusCode} : ${res.statusMessage}
      \t\tHeaders:\t${JSON.stringify(res._headers)}
      \t\t${body}
      `);
    }

  }



}


//===================================================
// Exports
//===================================================
module.exports = responseLogger;
//when res.send() called
//we need to replace that with something that will log and then actually send
