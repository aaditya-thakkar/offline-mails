const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const userRoutes = require('./routes');
const db = require('./config/db');

const app = express();
const port = 8082;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  db.url,
  (err, client) => {
    if (err) console.log(err);
    const database = client.db('omg');
    userRoutes(app, database);
    app.listen(port, () => {
      console.log(`We are live on ${port}`);
    });
  },
);
