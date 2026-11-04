const { body, validationResult } = require('express-validator');

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

// Register validation
const validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('graduationYear').isInt({ min: 1950, max: new Date().getFullYear() }),
  validateRequest
];

// Login validation
const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  validateRequest
];

// Donation validation
const validateDonation = [
  body('amount').isFloat({ min: 1 }),
  body('purpose').notEmpty().trim(),
  validateRequest
];

// Job validation
const validateJob = [
  body('title').notEmpty().trim(),
  body('company').notEmpty().trim(),
  body('location').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('requirements').isArray({ min: 1 }),
  validateRequest
];

// Event validation
const validateEvent = [
  body('title').notEmpty().trim(),
  body('description').notEmpty().trim(),
  body('date').isISO8601(),
  body('location').notEmpty().trim(),
  validateRequest
];

module.exports = {
  validateRegister,
  validateLogin,
  validateDonation,
  validateJob,
  validateEvent,
  validateRequest
};