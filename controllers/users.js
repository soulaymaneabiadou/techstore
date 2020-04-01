const asyncHandler = require('../middleware/async');

const User = require('../models/User');

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({role: /user/i}).sort({ createdAt: -1 });

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
