const { ObjectID } = require('mongodb');

module.exports = (app, db) => {
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const details = { userId: new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.get('/users', (req, res) => {
    db.collection('users')
      .find({})
      .toArray((err, result) => {
        if (err) {
          res.send({ error: 'An error has occurred' });
        } else {
          res.send(result);
        }
      });
  });

  app.post('/users', (req, res) => {
    const user = { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, verified: req.body.verified, otp: req.body.otp};
       db.collection('users').insertOne(user, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
       });
    });
};
