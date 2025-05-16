const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/auth/authController');
const userController = require('../app/controllers/user/userController');
const auth = require('../app/middleware/auth');
const {loginValidator } = require('../app/requests/login');
const {registerValidator } = require('../app/requests/register');
const validate = require('../app/middleware/validate');
const userResource = require('../app/resources/userResource');


router.post('/register', registerValidator, validate, authController.register);

router.post('/login', loginValidator, validate, authController.login);

router.get('/user',auth, userController.fetchData);

module.exports = router;