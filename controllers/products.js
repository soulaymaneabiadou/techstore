const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { uploadImage, deleteImage } = require('../utils/fileUpload');
const Product = require('../models/Product');

exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with ID of ${req.params.id}`, 404)
    );
  }

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

  if (!files) {
    return next(new ErrorResponse('Please provide at least one image', 400));
  }

  const images = await uploadImage(files);

  const data = { ...req.body, images };

  const product = await Product.create(data);

  res.status(200).json({
    success: true,
    data: product
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { files } = req;

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with ID of ${req.params.id}`, 404)
    );
  }

  if (files) {
    const images = await uploadImage(files);
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
      new ErrorResponse(`Product not found with ID of ${req.params.id}`, 404)
    );
  }

  const { images } = product;

  const result = await deleteImage(images);

  if (result == images.length) {
    await Product.findByIdAndDelete(req.params.id);
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

exports.updateProductQuantity = async (productId, orderdquantity) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return false;
      // return next(
      //   new ErrorResponse(`Product not found with ID of ${productId}`, 404)
      // );
    }

    product.quantity -= orderdquantity;

    await product.save();

    console.log(product);

    return true;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
