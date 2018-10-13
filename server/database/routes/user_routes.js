module.exports = (app, db) => {
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const details = { userId: id };
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

  app.put('/setUserOtp', (req, res) => {
    const { phoneNumber, email, otp } = req.body;
    const user = { phoneNumber, verified: false, otp };
    const details = { email };
    db.collection('users').updateOne(details, { $set: user }, err => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(user);
      }
    });
  });

  app.put('/userVerified', (req, res) => {
    const { phoneNumber } = req.body;
    const details = { phoneNumber: `+91${phoneNumber}` };
    const user = {
      verified: true,
    };
    db.collection('users').updateOne(details, { $set: user }, err => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(user);
      }
    });
  });

  app.post('/addUser', (req, res) => {
    const { tokens, userId, name, email } = req.body;
    const details = { tokens, userId, name, email };

    db.collection('users').insertOne(details, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/getOtp', (req, res) => {
    const { phoneNumber } = req.query;
    const details = { phoneNumber: `+91${phoneNumber}` };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send({ otp: item.otp });
      }
    });
  });
};
