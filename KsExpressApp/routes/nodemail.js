var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('mailer', { title: 'NodeMail is activated now..., see log' });
});


//"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com, katesapp2019@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello?", // plain text body
    html: "<b>Hello?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <abe0b619-b4e9-326d-e12f-9009aca519d1@example.com>
  // Message sent: <ad4bea91-e12e-36b6-2ee0-584552fe532b@example.com>
  // Message sent: <018971a1-ca0a-ad58-ebd7-988f272dab10@example.com>


  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/YDNLbkMiQn5TYw8LYDNLdFhIjn9MQFuTAAAAAaV8MQChJ9UvsEFCg1gHV6M
  // Preview URL: https://ethereal.email/message/YDNNIkMiQn5TYxItYDNNKVhIjn9MQGJPAAAAAc2cOnJ6CWpbQvEh1-T0vo0
  // Preview URL: https://ethereal.email/message/YDNNe0MiQn5TYy6iYDNNgA8a4X9evQhRAAAAAQ534WvYZ1fAm3H7qAf8pGQ


}


main().catch(console.error);


module.exports = router;