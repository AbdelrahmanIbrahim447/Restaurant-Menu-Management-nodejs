const { body } = require('express-validator');

const storeValidator = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('description').isString().withMessage('Description is required'),
  body('location').isString().withMessage('Location is required'),
];
  module.exports = {
    storeValidator,
  };