const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

exports.createCustomer = async (customer) => {
  const res = await stripe.customers.create({
    name: customer.name,
    email: customer.email,
  });

  return res.id;
};

exports.createSession = asyncHandler(async (req, res, next) => {
  const { price, quantity, product, orderId } = req.body;
  const { stripeId, name } = req.user;

  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   mode: 'payment',
  //   customer: stripeId,
  //   metadata: {
  //     order_id: orderId,
  //   },
  //   line_items: [
  //     {
  //       price_data: {
  //         product_data: {
  //           name: product.name,
  //           images: product.images,
  //         },
  //         currency: 'usd',
  //         unit_amount: price,
  //       },
  //       quantity,
  //     },
  //   ],

  //   success_url: 'http://localhost:3000/',
  //   cancel_url: `http://localhost:3000/app`,
  // });

  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ['card'],
    currency: 'usd',
    amount: price,
    customer: stripeId,
    metadata: {
      order_id: orderId,
    },
    shipping: {
      name: name,
      // address: {
      //   line1: null,
      //   city: null,
      //   country: null, // ISO-2 (UK, US, ...)
      //   postal_code: null, // zip
      //   state: null,
      // },
      // tracking_number: null,
    },
  });

  res.status(200).json({
    succes: true,
    // data: session.id
    data: paymentIntent.id,
  });
});

exports.hooksEvent = asyncHandler(async (req, res) => {
  const event = req.body;
  // const endpointSecret = process.env.WEBHOOKS_SECRET;

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`Successful payment`);
      console.log(paymentIntent);
      // TODO: Save the order and add the paymentIntent.id to that order
      break;

    default:
      console.log(`Event ${event.type}`);
      return res.status(400).end(`Event not supported yet: ${event.type}`);
  }

  res.status(200).json({
    success: true,
  });
});
