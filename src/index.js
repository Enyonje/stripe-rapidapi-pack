const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentsRoutes = require('./routes/payments');
const requireRapidApiKey = require('./middleware/auth');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const handleStripeWebhook = require('./webhooks/stripeWebhook');
const { port, nodeEnv } = require('./config');
const logger = require('./logger');

const app = express();

// Standard middlewares
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
if (nodeEnv !== 'production') app.use(morgan('dev'));

// Global rate limiter
app.use(rateLimiter);

// Health route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Stripe RapidAPI server running' });
});

// Webhook raw-body
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (req, res) => {
    req.rawBody = req.body;

    try {
      req.body = JSON.parse(req.rawBody.toString('utf8'));
    } catch (err) {}

    return handleStripeWebhook(req, res);
  }
);

// Protected API routes
app.use('/v1', requireRapidApiKey, paymentsRoutes);

// Global error handler
app.use(errorHandler);

app.listen(port, () => logger.info(`Stripe RapidAPI pack listening on ${port}`));

module.exports = app;
