const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth/authController');
const auth = require('../app/middleware/auth');
const {loginValidator } = require('../app/requests/login');
const {registerValidator } = require('../app/requests/register');
const validate = require('../app/middleware/validate');
const userResource = require('../app/resources/userResource');

router.post('/register', registerValidator, validate, authController.register);

router.post('/login', loginValidator, validate, authController.login);

router.get('/user', auth, (req, res) => {
  res.status(200).json({
    "user":new userResource(req.user)
  });
});

module.exports = router;