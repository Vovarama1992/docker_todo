const { body } = require('express-validator');

const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email address'),
  body('password')
    .exists()
    .withMessage('Password is required'),
];

const updateTaskValidator = [
  body('title').trim().notEmpty().withMessage('Title must not be empty'),
  body('description').trim().notEmpty().withMessage('Description must not be empty'),
  body('status').isBoolean().withMessage('Status must be a boolean value'),
];

module.exports = {
  validateRegistration,
  validateLogin,
  updateTaskValidator
};