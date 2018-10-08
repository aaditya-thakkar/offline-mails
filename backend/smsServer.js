// eslint-disable-file no-use-before-define 
var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var serverConstants = require('./constants.json');

var { host: mailReplyHost, port: mailReplyPort } = serverConstants.mailReplyServer;
var { host: smsServerHost, port: smsServerPort, receiveEndpoint, smsEndpoint } = serverConstants.smsServer;
var mailReplyUrl = 'http://' + mailReplyHost + ':' + mailReplyPort
var app = express();

function logger(...msg) {
  console.log('====>> ', ...msg);
}

function relativeUrl(endpoint) {
  return '/' + endpoint;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * /receive
 */
app.post(relativeUrl(receiveEndpoint), function (req, res) {
  logger('recieved mail');
  res.send('ack');
});

/**
 * /sms
 */
app.get(relativeUrl(smsEndpoint), function (req, res) {
  logger('sms received');
  logger('forwarding mail on', mailReplyUrl);
  axios.post(mailReplyUrl, {
    foo: 'bar'
  }).then(
    function(res) { logger('response received') },
    function(err) { logger('error'); }
  );
});

const server = app.listen(smsServerPort, function () {
  logger('app running on port', server.address().port);
});
