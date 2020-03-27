const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct
} = require('../controllers/products');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), createProduct);

router.get('/:id', getProduct);

module.exports = router;
