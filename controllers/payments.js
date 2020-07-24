const stripe = require('stripe')(process.env.STRIPE_SK_KEY);
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { createOrder } = require('./orders');

/**
 * Create a customer account in stripe for a user
 * @param {Object} customer the user that signed up
 * @returns the customer's ID that was created
 */
exports.createCustomer = async (customer) => {
  const res = await stripe.customers.create({
    name: customer.name,
    email: customer.email
  });

  return res.id;
};

/**
 *
 */
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return next(new ErrorResponse('Order total must be greater than 0', 400));
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card']
  });

  res.status(200).json({
    success: true,
    data: paymentIntent
  });
});

exports.hooksEvent = asyncHandler(async (req, res, next) => {
  const event = req.body;
  // const endpointSecret = process.env.WEBHOOKS_SECRET;
  const paymentIntent = event.data.object;
  let msg = '';

  switch (event.type) {
    case 'payment_intent.created':
      msg = 'Created';
      // TODO: Create order
      break;

    case 'payment_intent.succeeded':
      msg = 'Successful';
      // TODO: Mark order as 'paid'
      // and remove metadata from paymentintent
      break;

    case 'payment_intent.payment_failed':
      msg = 'Failed';
      // TODO: Mark order as 'cancelled'
      break;

    default:
      console.log(`Event ${event.type}`);
      return res.status(400).end(`Event not supported yet: ${event.type}`);
  }

  console.log(`Payment ${msg}: ${paymentIntent.id}`);

  res.status(200).json({
    success: true
  });
});
