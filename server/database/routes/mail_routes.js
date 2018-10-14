const { ObjectID } = require('mongodb');

module.exports = (app, db) => {
  app.post('/fetchMails', (req, res) => {
    const { phoneNumber } = req.body;
    db.collection('mail')
      .find({ phoneNumber })
      .sort({ date: -1 })
      .limit(40)
      .toArray((err, result) => {
        if (err) {
          res.send({ error: 'An error has occurred' });
        } else {
          res.send(result);
        }
      });
  });

  app.get('/mailLookup', (req, res) => {
    const { id } = req.query;
    const details = { _id: new ObjectID(id) };
    db.collection('mail').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/mail/insert', (req, res) => {
    const mails = req.body;
    // console.log('===>> receive mails', req.body);
    db.collection('mail').insertMany(mails, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
