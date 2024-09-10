const config = require('./config.json');
const env = process.env.NODE_ENV || 'development';

const { username, password, database, host, dialect } = config[env];

module.exports = {
  username,
  password,
  database,
  host,
  dialect,
};

