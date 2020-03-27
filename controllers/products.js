const asyncHandler = require('../middleware/async');
const { uploadImage } = require('../utils/fileUpload');

const Product = require('../models/Product');

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: product
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, quantity } = req.body;

  const image = await uploadImage(req);
  const images = [image];
  const data = {
    name,
    description,
    price,
    quantity,
    images
  };

  const product = await Product.create(data);

  res.status(200).json({
    success: true,
    data: product
  });
});
