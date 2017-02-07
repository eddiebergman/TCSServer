//===================================================
// Modules
//===================================================
var nodemailer            = require('nodemailer');

//===================================================
// Setup
//===================================================
function Mailer(options){

  var mailer = {}

  let poolConfig = 'smtps://eddiebergmanhs%40gmail.com:G_Chicken2@smtp.gmail.com/?pool=true';

  if(!options) throw new Error("Please provide options for /components/mailers.js");
  if(!options.service) throw new Error("Please provide an options.service for mailer to use");
  if(!options.user) throw new Error("Please provide an options.user for mailer to use");
  if(!options.pass) throw new Error("Please provide an options.pass for mailer to use");

  //TODO edit this so it works xx ./components/mailer
  var transportConfig = {
    service   : options.service,
    auth : {
      user : options.user,
      pass : options.pass
    }
  }

  var transporter = nodemailer.createTransport(transportConfig);

  mailer.sendMail = function(mail){
    transporter.sendMail(mail, function(err,inf){
      if(err) console.log(err);
      else console.log(inf);
    })
  }

  return mailer;
}


//===================================================
// Exports
//===================================================
module.exports = Mailer;
