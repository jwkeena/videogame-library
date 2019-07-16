const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apiKey: process.env.GIANT_BOMB_KEY,
  jawsHost: process.env.JAWS_DB_HOST,
  jawsPassword: process.env.JAWS_DB_PASSWORD,
  jawsUsername: process.env.JAWS_DB_USERNAME,
  jawsDatabase: process.env.JAWS_DB_DATABASE
};