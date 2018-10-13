const http = require('http');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const axios = require('axios');

const parseMessage = require('./parse_message');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PHONE_NUMBER = '8320986343';

let mailIdsCache = {};

app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();
  twiml.message("Sorry I cannot recognise this input");
  if (req.body.Body.toLowerCase() === 'fetch mails') {
    const response = await axios.get(
      `http://localhost:8082/fetchMails?phoneNumber=${PHONE_NUMBER}`,
    );
    console.log(response.data);
    const { message, mailIds } = parseMessage(response.data);
    mailIdsCache[PHONE_NUMBER] = mailIds;
    twiml.message(message);
  }

  if (Number.isInteger(req.body.Body) {
    let mailNumber = Number(req.body.Body);
    if(mailNumber >=0 && mailNumber <=9){
       const response = await axios.get(
         `http://localhost:8082/mailLookup?id=${mailIdsCache[PHONE_NUMBER][mailNumber]}`,
       );
    }
    else{
      twiml.message("Sorry I cannot recognise this input");
    }
  }
  else{
    twiml.message("Sorry I cannot recognise this input");
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());

});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
