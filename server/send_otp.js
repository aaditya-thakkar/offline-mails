
const accountSid =  'AC4ced3e98103ed9fc444bf7ba03115b4b';
const authToken =   '9da49b2dd9b382f097fabd59f396ff68';
const from_number = '+15153208709';
const client = require('twilio')(accountSid, authToken);

function send_otp(req, res){
	otp = Math.floor(Math.random() * 10000 + 54);
	client.messages
  		.create({
     body: 'Your Offline-Mails otp is'+otp+'. This otp can be used only once and is valid for 5 mins only.',
     from: from_number,
     to: req.query['phoneNumber'] //auto-generated UK phone number from https://www.receive-sms-online.info
   })
  .then(message => console.log(message.sid))
  .done();

  
}

module.exports = send_otp;