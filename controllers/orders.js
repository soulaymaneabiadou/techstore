const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');

exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

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

  const order = await Order.create(req.body);

  res.status(200).json({
    success: true,
    data: order
  });
});
