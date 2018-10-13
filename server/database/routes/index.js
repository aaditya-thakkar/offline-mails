const userRoutes = require('./user_routes');
const mailRoutes = require('./mail_routes');

module.exports = function(app, db) {
  userRoutes(app, db);
  mailRoutes(app, db);
};
