const http = require('http');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const axios = require('axios');

const {FetchMessage, ParseMessage} = require('./process_message');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PHONE_NUMBER = '9722761117';

const mailIdsCache = {};
const pagination = {};
const messagesCache = {};

app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();
  req.body.From = PHONE_NUMBER; // remove this line to check with actual phone number sending message to twilio
  if (req.body.Body.toLowerCase() === 'fetch mails') {
      
      if(!(req.body.From in pagination)){
       pagination[req.body.From] = 0;
      }
    const response = await axios.get(
      `http://localhost:8082/fetchMails?phoneNumber=${req.body.From}`,
    );
    console.log(response.data);
    const { messages, mailIds } = FetchMessage(response.data);
    mailIdsCache[req.body.From] = mailIds;
    messagesCache[req.body.From] = messages;
    let message = ParseMessage(messagesCache[req.body.From], 0);
    twiml.message(message);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
    return;
 }

  if(req.body.Body.toLowerCase() === 'x'){
    if(req.body.From in messagesCache){
        pagination[req.body.From]+=10;
        let message = ParseMessage(messagesCache[req.body.From], pagination[req.body.From]);
        twiml.message(message);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
        return;
    }
    else{
          twiml.message('Sorry I cannot recognise this input');
          res.writeHead(200, { 'Content-Type': 'text/xml' });
          res.end(twiml.toString());
          return;
    }
  }

  if (Number.isInteger(Number(req.body.Body))) {
    const mailNumber = Number(req.body.Body);
    if (mailNumber >= 0 && mailNumber <= (9+pagination[req.body.From])) {
      console.log(mailIdsCache[req.body.From][mailNumber]);
      const response = await axios.get(
        `http://localhost:8082/mailLookup?id=${
          mailIdsCache[req.body.From][mailNumber]
        }`,
      );
      console.log(response.data)
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
