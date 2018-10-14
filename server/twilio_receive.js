const http = require('http');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const axios = require('axios');
const sendSMS = require('./send_sms');

const { FetchMessage, ParseMessage } = require('./process_message');

const app = express();

const PAGE_SIZE = 5;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PHONE_NUMBER = '+919722761117';

const mailIdsCache = {};
const pagination = {};
const messagesCache = {};

app.post('/otg', async (req, res) => {
  const mail = req.body.mail;
  console.log('======>> req', req.body.mail)
  sendSMS(mail)
  res.send('successfully sent sms')
});

app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();
  req.body.From = PHONE_NUMBER; // remove this line to check with actual phone number sending message to twilio
  if (req.body.Body.toLowerCase() === 'fetch mails') {
    if (!(req.body.From in pagination)) {
      pagination[req.body.From] = 0;
    }
    const response = await axios({
      url: 'http://localhost:8082/fetchMails',
      method: 'POST',
      data: {
        phoneNumber: req.body.From,
      },
    });
    const { messages, mailIds } = FetchMessage(response.data);
    mailIdsCache[req.body.From] = mailIds;
    messagesCache[req.body.From] = messages;
    const message = ParseMessage(messagesCache[req.body.From], 0);
    console.log('message--> ', message, req.body);
    twiml.message(message);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }

  if (req.body.Body.toLowerCase() === 'x') {
    if (req.body.From in messagesCache) {

      pagination[req.body.From] += PAGE_SIZE;
      const message = ParseMessage(
        messagesCache[req.body.From],
        pagination[req.body.From],
      );
      twiml.message(message);
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
      return;
    }

    twiml.message('Sorry I cannot recognise this input');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
  }

  if (Number.isInteger(Number(req.body.Body))) {
    const mailNumber = Number(req.body.Body);

    if (
      mailNumber >= 0 &&
      mailNumber <= PAGE_SIZE - 1 + pagination[req.body.From]
    ) {
      console.log(mailIdsCache[req.body.From][mailNumber]);
      const response = await axios.get(
        `http://localhost:8082/mailLookup?id=${
          mailIdsCache[req.body.From][mailNumber]
        }`,
      );
      console.log(response.data);
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
