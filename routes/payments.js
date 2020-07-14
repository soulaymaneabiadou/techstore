// routes
const express = require('express');
const { createSession, hooksEvent } = require('../controllers/payments');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// router.use(authorize(['admin']));

router.post('/', protect, createSession);

router.post('/hooks', hooksEvent);

module.exports = router;
