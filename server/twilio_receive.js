const http = require('http');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const bodyParser = require('body-parser');
const axios = require('axios');

const parseMessage = require('./parse_message');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userId_mails_map = {};

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  if(req.body.Body.toLowerCase() === "fetch mails"){
  axios.get('http://localhost:8082/mail?phoneNumber='+request.body.From)
    .then(function(response){
    console.log(response.data);
    var tuple = parseMessage(response.data);
    userId_mails_map = tuple.userId_mails_map;
    twiml.message(tuple.message);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }); 
  }
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});