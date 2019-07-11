const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  apiKey: process.env.GIANT_BOMB_KEY,
};