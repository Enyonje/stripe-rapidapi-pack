const Joi = require('joi');

const createPaymentIntentSchema = Joi.object({
  amount: Joi.number().integer().min(50).required(),
  currency: Joi.string().length(3).default('usd'),
  customerId: Joi.string().optional(),
  metadata: Joi.object().optional()
});

module.exports = {
  validateCreatePaymentIntent: (data) => createPaymentIntentSchema.validate(data)
};