const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/paymentsController');

router.post('/create-payment-intent', ctrl.createPaymentIntent);
router.post('/create-customer', ctrl.createCustomer);
router.post('/attach-payment-method', ctrl.attachPaymentMethod);
router.post('/refund', ctrl.refundCharge);
router.get('/charges', ctrl.listCharges);
router.post('/create-subscription', ctrl.createSubscription);

module.exports = router;  // ✅ export router directly