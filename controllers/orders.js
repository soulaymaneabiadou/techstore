const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');

exports.getOrders = asyncHandler(async (req, res, next) => {
  let query;
  if(req.user.role === 'user') {
    query = Order.find({ user: req.user.id }).select('-user');
  } else {
    query = Order.find().populate({
      path: 'user',
      select: 'name email'
    });
  }

  const orders = await query;

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with ID of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

exports.createOrder = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const {street, zip, city, country} = req.body.address;
  const {products} = req.body;

  if (!street || !zip || !city || !country) {
    return next(new ErrorResponse('All fields are required', 404));
  }

  if(!products || products.length <= 0) {
    return next(new ErrorResponse('Can not order with an empty cart', 404));
  }

  const order = await Order.create(req.body);

  res.status(200).json({
    success: true,
    data: order
  });
});
