const express = require('express');
const { getOrders, getOrder, createOrder } = require('../controllers/orders');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('user'));

router
  .route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/:id').get(getOrder);

module.exports = router;
