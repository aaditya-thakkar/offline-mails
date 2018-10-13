const { ObjectID } = require('mongodb');

module.exports = (app, db) => {
  app.get('/fetchMails', (req, res) => {
    const { phoneNumber } = req.query;
    db.collection('mail')
      .find({ phoneNumber: `+91${phoneNumber}` })
      .sort({ time: -1 })
      .limit(4)
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
    const { mails } = req.body;
    db.collection('mail').insertMany(mails, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
