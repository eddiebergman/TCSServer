//===================================================
// Modules
//===================================================
var _               = require('underscore')
var winston         = require('winston');

//===================================================
// Setup
//===================================================
var requestLogger = {}

//===================================================
// Middleware
//===================================================
requestLogger.basic = function(){
  console.log("here");
  return function(req, res, next){
    var body = _.isEmpty(req.body)? "" : ("Body:\t"+JSON.stringify(req.body));
    winston.log('debug',`
=Request============================================
\t\t${req.method}:\t${req.originalUrl}
\t\tSource:\t${req.ip}
\t\t${body}
`);

    return next();
  }

}

//===================================================
// Exports
//===================================================
module.exports = requestLogger;
