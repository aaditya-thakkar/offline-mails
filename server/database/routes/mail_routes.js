module.exports = (app, db) => {

  app.get('/mail', (req, res) => {
    db.collection('mail')
      .find({})
      .toArray((err, result) => {
        if (err) {
          res.send({ error: 'An error has occurred' });
        } else {
          res.send(result);
        }
      });
  });


  app.post('/mail/insert', (req, res) => {
    const { mails } = req.body;
    db.collection('mail').insertMany(mails, ( err, result ) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
      } else {
          res.send(result.ops[0]);
      }
      });
  });
};
