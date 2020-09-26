const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Order = require('../models/Order');
const { updateProductQuantity } = require('./products');

exports.getOrders = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'user') {
    const orders = await Order.find({ customer: req.user.id }).select('-user');

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

exports.createOrder = async (pi) => {
  try {
    const { amount } = pi;
    const { user, products } = pi.metadata;

    const newOrder = {
      customer: user,
      total_price: amount,
      payment_id: pi.id,
      products: JSON.parse(products)
    };

    const order = await Order.create(newOrder);

    return order;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

exports.updateOrder = async (pi, status) => {
  try {
    const { id } = pi;
    const products = JSON.parse(pi.metadata.products);

    const order = await Order.findOne({ payment_id: id });

    if (!order) {
      return next(
        new ErrorResponse(`Order not found with payment id of ${id}`, 404)
      );
    }

    products.forEach(async (product) => {
      const { id, ordered_quantity } = product;

      const res = await updateProductQuantity(id, ordered_quantity);

      if (!res) {
        console.log('error');
      }
    });

    order.status = status;
    await order.save();

    return order;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
