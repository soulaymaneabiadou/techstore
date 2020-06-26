const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

exports.createSession = asyncHandler(async (req, res, next) => {
  const { price, quantity, product } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    locale: 'auto',
    line_items: [
      {
        price_data: {
          product_data: {
            name: product.name,
            images: product.images
          },
          currency: 'usd',
          unit_amount: price
        },
        quantity
      }
    ],

    success_url: 'http://localhost:3000/',
    cancel_url: `http://localhost:3000/app`
  });

  res.status(200).json({
    succes: true,
    data: session.id
  });
});
