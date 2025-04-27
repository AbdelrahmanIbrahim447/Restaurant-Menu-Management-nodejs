const { body } = require('express-validator');
const User = require('../repositories/userRepository');

const registerValidator = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
  , 
  
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email')
    .custom(async email => {
      if(!email) throw new Error('no Email found');
      const user = await User.findUserByEmail(email);
      if (user) throw new Error('Email already in use');
    }),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];
  module.exports = {
    registerValidator,
  };