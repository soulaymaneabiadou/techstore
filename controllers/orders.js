const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');

exports.getOrders = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'user') {
    const orders = await Order.find({ user: req.user.id }).select('-user');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new ErrorResponse(`Order not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: order
  });
});
