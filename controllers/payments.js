const stripe = require('stripe')(process.env.STRIPE_SK_KEY);
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { createOrder, updateOrder } = require('./orders');

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
  const { amount, metadata } = req.body;
  const products = JSON.parse(metadata).products;

  if (!amount || amount <= 0) {
    return next(new ErrorResponse('Order total must be greater than 0', 400));
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
    metadata: {
      user: req.user.id,
      products: JSON.stringify(products)
    }
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
      await createOrder(paymentIntent);
      break;

    case 'payment_intent.succeeded':
      msg = 'Successful';
      await updateOrder(paymentIntent, 'paid');
      break;

    case 'payment_intent.payment_failed':
      msg = 'Failed';
      await updateOrder(paymentIntent, 'cancelled');
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
