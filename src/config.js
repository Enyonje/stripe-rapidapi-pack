const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  stripeKey: process.env.STRIPE_SECRET_KEY,
  rapidapiKey: process.env.RAPIDAPI_KEY,
  webhookSecret: process.env.WEBHOOK_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development'
};