const express = require('express');
const { getOrders, getOrder, createOrder } = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getOrders)
  .post(authorize('user'), createOrder);

router.route('/:id').get(getOrder);

module.exports = router;
