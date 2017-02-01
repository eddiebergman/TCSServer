// //===================================================
// // Modules
// //===================================================
// var nodemailer            = require('nodemailer');
//
// //===================================================
// // Setup
// //===================================================
// function Mailer(options){
//
//   if(!options) throw new Error("Please provide options for /components/mailers.js");
//   if(!options.service) throw new Error("Please provide an options.service for mailer to use");
//   if(!options.user) throw new Error("Please provide an options.user for mailer to use");
//   if(!options.pass) throw new Error("Please provide an options.pass for mailer to use");
//
//   var transportConfig = {
//     service   : options.service,
//     auth : {
//       user : options.user,
//       pass : options.pass
//     }
//   }
//
//   var transporter = nodemailer.createTransport(transportConfig);
//
//   var mail = {
//     from : 'eddiebergmanhs@gmail.ie',
//     to : 'ebergman@tcd.ie',
//     subject : 'Test please work',
//     text : 'Please succeed,\nKind Regards,\nMe'
//   }
//
//   transporter.sendMail(mail, function(err,inf){
//     if(err) console.log(err);
//     else console.log(inf);
//   })
//
//   return nodemailer;
// }
//
//
// //===================================================
// // Exports
// //===================================================
// module.exports = Mailer;
