// routes
const express = require('express');
const { createSession } = require('../controllers/payments');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);
// router.use(authorize(['admin']));

router.post('/', createSession);

module.exports = router;
