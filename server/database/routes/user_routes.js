const { ObjectID } = require('mongodb');

module.exports = (app, db) => {
  console.log(db);
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
};