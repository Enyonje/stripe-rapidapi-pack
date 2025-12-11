const Stripe = require('stripe');
const { stripeKey } = require('../config');

if (!stripeKey) throw new Error('Missing STRIPE_SECRET_KEY in env');

const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-01' });
module.exports = stripe;