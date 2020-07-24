const express = require('express');
const { getOrders, getOrder, createOrder } = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Order = require('../models/Order');
const router = express.Router();

router.use(protect);

router.route('/').get(
  advancedResults(Order, {
    path: 'user',
    select: 'name email'
  }),
  getOrders
);

router.route('/:id').get(getOrder);

module.exports = router;
