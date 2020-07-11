const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const User = require('../models/User');

exports.getUsers = asyncHandler(async (req, res, next) => {
  // const users = await User.find({ role: /user/i }).sort({ createdAt: -1 });

  // res.status(200).json({
  //   success: true,
  //   count: users.length,
  //   data: users,
  // });
  res.status(200).json(res.advancedResults);
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(new ErrorResponse('Access Denied', 401));
  }

  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 401)
    );
  }

  const data = { ...req.body };
  user = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});
