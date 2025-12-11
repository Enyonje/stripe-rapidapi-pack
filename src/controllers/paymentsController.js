const stripe = require('../utils/stripeClient');
const { validateCreatePaymentIntent } = require('../utils/validators');

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { error, value } = validateCreatePaymentIntent(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const { amount, currency, customerId, metadata } = value;
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      metadata
    });

    res.json({ id: intent.id, clientSecret: intent.client_secret, status: intent.status });
  } catch (err) {
    next(err);
  }
};

exports.createCustomer = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const customer = await stripe.customers.create({ email, name });
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.attachPaymentMethod = async (req, res, next) => {
  try {
    const { paymentMethodId, customerId } = req.body;
    if (!paymentMethodId || !customerId) return res.status(400).json({ error: 'paymentMethodId and customerId required' });

    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    await stripe.customers.update(customerId, { invoice_settings: { default_payment_method: paymentMethodId } });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.refundCharge = async (req, res, next) => {
  try {
    const { chargeId, amount } = req.body;
    if (!chargeId) return res.status(400).json({ error: 'chargeId required' });

    const refund = await stripe.refunds.create({ charge: chargeId, amount });
    res.json(refund);
  } catch (err) {
    next(err);
  }
};

exports.listCharges = async (req, res, next) => {
  try {
    const charges = await stripe.charges.list({ limit: 10 });
    res.json(charges);
  } catch (err) {
    next(err);
  }
};

exports.createSubscription = async (req, res, next) => {
  try {
    const { customerId, priceId, paymentBehavior = 'default_incomplete' } = req.body;
    if (!customerId || !priceId) return res.status(400).json({ error: 'customerId and priceId required' });

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
      payment_behavior: paymentBehavior
    });

    res.json(subscription);
  } catch (err) {
    next(err);
  }
};
``