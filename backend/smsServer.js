/* eslint-disable no-unused-vars */
// eslint-disable-file no-use-before-define
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const serverConstants = require('./constants.json');

const {
  host: mailReplyHost,
  port: mailReplyPort,
} = serverConstants.mailReplyServer;
const {
  host: smsServerHost,
  port: smsServerPort,
  receiveEndpoint,
  smsEndpoint,
} = serverConstants.smsServer;
const mailReplyUrl = `http://${mailReplyHost}:${mailReplyPort}`;
const app = express();

function logger(...msg) {
  console.log('====>> ', ...msg);
}

function relativeUrl(endpoint) {
  return `/${endpoint}`;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * /receive
 */
app.post(relativeUrl(receiveEndpoint), (req, res) => {
  logger('recieved mail');
  res.send('ack');
});

/**
 * /sms
 */
app.get(relativeUrl(smsEndpoint), (req, res) => {
  logger('sms received');
  logger('forwarding mail on', mailReplyUrl);
  axios
    .post(mailReplyUrl, {
      foo: 'bar',
    })
    .then(
      response => {
        logger('response received');
      },
      error => {
        logger('error');
      },
    );
});

const server = app.listen(smsServerPort, () => {
  logger('app running on port', server.address().port);
});
