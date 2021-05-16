const nodemailer = require('nodemailer');
const ServiceResponse = require("../BaseClasses/ServiceResponse").serviceResponse;
const appConstants = require("../utils/constants").appConstants;
// const sgMail = require('@sendgrid/mail');

const transporter = nodemailer.createTransport({
  service: 'Mailjet',
  auth: {
    user: process.env.MAILJET_USER,
    pass: process.env.MAILJET_PASSWORD
  }
});

const mailOptions = {
  from: "jaykarn100@live.com",
  to: 'myfriend@yahoo.com',
  subject: 'SmartCricket Otp',
  text: 'That was easy!'
};


// const sendMail = async (to, mailContent, subject, format = "text") => {
//   try{
//     sgMail.setApiKey('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');
//     const msg = {
//       to: to,
//       from: 'service@gbtt',
//       subject: subject,
//       text: mailContent,
//       // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     };
//     await sgMail.send(msg);
//     let sr = new ServiceResponse(true,appConstants.EMAIL_SENT);
//     return sr.getServiceResponse();
//   }catch(e){
//     console.log(e,process.env.SENDGRID_API_KEY)
//     let sr = new ServiceResponse(false,appConstants.EMAIL_SERVICE_NOT_AVAILABLE);
//     return sr.getServiceResponse();
//   }
// }
const sendMail = async (to,mailContent,subject,format = "text") => {
  mailOptions[format] = mailContent;
  mailOptions.to = to;
  mailOptions.subject = subject;
  let result = await mailerPromise();
  console.log("to",to)
  return result;
}

const mailerPromise = () => {
  return new Promise((resolve,reject) => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        let sr = new ServiceResponse(false,appConstants.EMAIL_SERVICE_NOT_AVAILABLE);
        resolve(sr.getServiceResponse());  
      } else {
        console.log('Email sent: ' + info.response);
        let sr = new ServiceResponse(true,appConstants.SMS_SENT);
        resolve(sr.getServiceResponse()); 
      }
    });
  })
}


module.exports = {
  sendMail: sendMail
}