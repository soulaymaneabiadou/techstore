const express = require('express');
const { getUsers, getUser, updateProfile } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

const router = express.Router();

router.use(protect);

router.route('/').get(authorize('admin'), advancedResults(User, ''), getUsers);

router.route('/:id').get(authorize('admin'), getUser).put(updateProfile);

module.exports = router;
