const http = require('http');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const axios = require('axios');

const parseMessage = require('./parse_message');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PHONE_NUMBER = '9722761117';

const mailIdsCache = {};

app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();

  if (req.body.Body.toLowerCase() === 'fetch mails') {
    const response = await axios.get(
      `http://localhost:8082/fetchMails?phoneNumber=${PHONE_NUMBER}`,
    );
    console.log(response.data);
    const { message, mailIds } = parseMessage(response.data);
    mailIdsCache[PHONE_NUMBER] = mailIds;
    twiml.message(message);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }

  if (Number.isInteger(Number(req.body.Body))) {
    const mailNumber = Number(req.body.Body);
    if (mailNumber >= 0 && mailNumber <= 9) {
      const response = await axios.get(
        `http://localhost:8082/mailLookup?id=${
          mailIdsCache[PHONE_NUMBER][mailNumber]
        }`,
      );
      let decodedBody = '';
      try {
        decodedBody = decodeURIComponent(response.data.body);
      } catch (e) {
        decodedBody = response.data.body;
      }
      twiml.message(decodedBody);
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
      return;
    }
    twiml.message('Sorry I cannot recognise this input');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }
  twiml.message('Sorry I cannot recognise this input');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
