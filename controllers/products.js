const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { uploadImage, deleteImage } = require('../utils/fileUpload');

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
  const { files } = req;

  if (!name || !description || !price || !quantity) {
    return next(new ErrorResponse('All fields are required', 400));
  }

  if(!files) {
    return next(new ErrorResponse('Please provide at least one image', 400));
  }

  if (files) {
    const images = await uploadImage(files);
    if (!images) {
      return next(new ErrorResponse('Please provide at least one image', 400));
    }

    req.body.images = images;
  }

  const data = { ...req.body };
  const product = await Product.create(data);

  res.status(200).json({
    success: true,
    data: product
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, quantity } = req.body;
  const { files } = req;

  let product = await Product.findById(req.params.id);

  if (!name || !description || !price || !quantity) {
    return next(new ErrorResponse('All fields are required', 400));
  }

  if (files) {
    const images = await uploadImage(files);
    if (!images) {
      return next(new ErrorResponse('Please provide at least one image', 400));
    }

    req.body.images = [...product.images, ...images];
  }

  const data = { ...req.body };
  product = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse('No product has been found with the givin ID', 400)
    );
  }

  const { images } = product;

  const result = await deleteImage(images);

  if (result == images.length) {
    await Product.findByIdAndDelete(req.params.id);
  }

  res.status(200).json({
    success: true
  });
});
