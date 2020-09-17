const nodemailer = require("nodemailer");
const config = require("../configs/config");
module.exports = async function emailSender(options){
// 1. transport => configuration
// 2. parameters
// 3. send mail

//1. transport => configuration
console.log(options.from);
const transport = nodemailer.createTransport({
  service: "gmail",
  tls: {
    rejectUnAuthorized:  false
  },
  secure: false,
  port: 2525,
  auth: {
    user: config.EMAIL_ID,
    pass: config.EMAIL_PASSWORD,
  },
  //logger: true,
  //debug: false 
},
{
    from: options.from,
}
);
const mailOptions = {
 //from: options.from,
  to: options.to,
  subject: options.subject,
  html: options.html,
  text: options.text,
}


  console.log(transport.defaults)
//2. parameters
console.log(options.html);
console.log(options.from);
//3. send mail
await transport.sendMail(mailOptions);
}

// sendMail().then(function (){
//     console.log("email has been sent!");
// }).catch(function (err){
//     console.log(err);
// })