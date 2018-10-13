const accountSid = 'AC4ced3e98103ed9fc444bf7ba03115b4b';
const authToken = '9da49b2dd9b382f097fabd59f396ff68';
const fromNumber = '+15153208709';
const axios = require('axios');
const client = require('twilio')(accountSid, authToken);

function sendOtp(req, res) {
  const otp = Math.floor(Math.random() * 10000 + 54);
  console.log('here you go', req.body);

  client.messages
    .create({
      body: `Your Offline-Mails otp is ${otp}. This otp can be used only once and is valid for 5 mins only.`,
      from: fromNumber,
      to: req.body.phoneNumber, // auto-generated UK phone number from https://www.receive-sms-online.info
    })
    .then(message => console.log(message.sid))
    .done();

  res.send('otp sent');

  axios.post('http://localhost:8082/users', 
	  {
		"name": req.body.name,
		"email": req.body.email,
		"phoneNumber": req.body.phoneNumber,
		"verified": "false",
		"otp": otp
	   }
  	)
  .then(function(response){
    console.log('saved successfully')
  });
}

module.exports = sendOtp;
