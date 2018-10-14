const accountSid = 'AC4ced3e98103ed9fc444bf7ba03115b4b';
const authToken = '9da49b2dd9b382f097fabd59f396ff68';
const client = require('twilio')(accountSid, authToken);

function parseMail(mail) {
  const str = 'FROM: '+ mail.from + '\nSUBJECT: ' + mail.sub + '\nBODY: ' + mail.body + '\nTIME:' + mail.date;
  return str
}

function sendSMS(mail) {
  client.messages
  .create({
    body: parseMail(mail),
    from: '+15153208709',
    to: '+919722761117', // auto-generated UK phone number from https://www.receive-sms-online.info
  })
  .then(message => console.log(message.sid))
  .done();
}

module.exports = sendSMS;
