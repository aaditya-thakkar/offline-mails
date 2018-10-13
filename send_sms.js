
const accountSid =  'AC4ced3e98103ed9fc444bf7ba03115b4b';
const authToken =   '9da49b2dd9b382f097fabd59f396ff68';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hey buddy!',
     from: '+15153208709',
     to: '+447401130249' //auto-generated UK phone number from https://www.receive-sms-online.info
   })
  .then(message => console.log(message.sid))
  .done();