var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mail', { title: 'MailGun' });
});

var api_key = '0123456789';
var domain = 'www.mydomain.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'Kate <katesapp2019@gmail.com>',
  to: 'katesreact20202@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});


var list = mailgun.lists('admin@pattyappier.com');

list.info(function (err, data) {
  // `data` is mailing list info
  console.log(data);
});

var Queen = {
  subscribed: true,
  address: 'pattyappier@gmail.com',
  name: 'Patty Chen',
  vars: {age: 30}
};

list.members().create(Queen, function (err, data) {
  // `data` is the member details
  console.log(data);
});

list.members().list(function (err, members) {
  // `members` is the list of members
  console.log(members);
});

list.members('pattyappier@gmail.com').update({ name: 'Queen Chen' }, function (err, body) {
  console.log(body);
});

list.members('pattyappier@gmail.com').delete(function (err, data) {
  console.log(data);
});


module.exports = router;