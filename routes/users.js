const express = require('express');
const { getUsers, getUser, updateProfile } = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').get(authorize('admin'), getUsers);

router
  .route('/:id')
  .get(getUser)
  .put(updateProfile);

module.exports = router;
