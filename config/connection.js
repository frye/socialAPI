const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/socialAPI_db';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;