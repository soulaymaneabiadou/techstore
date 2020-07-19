const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

/**
 * Create a customer account in stripe for a user
 * @param {Object} customer the user that signed up
 * @returns the customer's ID that was created
 */
exports.createCustomer = async (customer) => {
  const res = await stripe.customers.create({
    name: customer.name,
    email: customer.email,
  });

  return res.id;
};

/**
 *
 */
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { name, stripeId } = req.user;
  const { amount, address } = req.body;
  // const { street, postal_code, city, country, state } = address || {};

  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    currency: 'usd',
    amount: amount,
    customer: stripeId,
    // shipping: {
    //   name: name,
    //   address: {
    //     line1: street,
    //     city: city,
    //     country: country,
    //     postal_code: postal_code,
    //     state: state,
    //   },
    // },
  });

  res.status(200).json({
    success: true,
    data: paymentIntent, //.client_secret,
  });
});

exports.hooksEvent = asyncHandler(async (req, res) => {
  const event = req.body;
  // const endpointSecret = process.env.WEBHOOKS_SECRET;
  let paymentIntent;

  switch (event.type) {
    case 'payment_intent.succeeded':
      paymentIntent = event.data.object;
      console.log(`Successful payment`);
      console.log(paymentIntent);
      // TODO: Mark order as 'paid'
      break;

    case 'payment_intent.payment_failed':
      paymentIntent = event.data.object;
      console.log(`Failed payment`);
      console.log(paymentIntent);
      // TODO: Mark order as 'cancelled'
      break;

    default:
      console.log(`Event ${event.type}`);
      return res.status(400).end(`Event not supported yet: ${event.type}`);
  }

  res.status(200).json({
    success: true,
  });
});
