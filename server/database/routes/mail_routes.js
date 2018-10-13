module.exports = (app, db) => {
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
