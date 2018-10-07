var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/receive', function (req, res) {
  console.log('=====>> recieved mail', req);
  res.send('thanks');
});

const server = app.listen(5051, function () {
  console.log('=====>> app running on port', server.address().port);
});
