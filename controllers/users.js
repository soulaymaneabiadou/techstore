const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { uploadImage, deleteImage } = require('../utils/fileUpload');

const User = require('../models/User');

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({ role: /user/i }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { files } = req;

  let user = await User.findById(req.params.id);

  if (!name) {
    return next(new ErrorResponse('All fields are required', 400));
  }

  if (files) {
    const image = await uploadImage(files);
    if (!image) {
      return next(new ErrorResponse('Please provide an image', 400));
    }

    req.body.image = image[0];
  }

  const data = { ...req.body };
  user = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});
