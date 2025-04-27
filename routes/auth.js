const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');
const auth = require('../app/middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/auth/user
// @desc    Get current user (protected route example)
// @access  Private
router.get('/user', auth, (req, res) => {
  res.json({ userId: req.userId });
});

module.exports = router;