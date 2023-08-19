const { body, validationResult } = require('express-validator')

const loginValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Enter your username.')
    .isLength({ max: 255 })
    .withMessage('Username must contain less than 256 characters.'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Enter your password.')
    .isLength({ max: 255 })
    .withMessage('Password must contain less than 256 characters.'),
]

const signupValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Enter your username.')
    .isLength({ max: 255 })
    .withMessage('Username must contain less than 256 characters.'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Enter your password.')
    .isLength({ max: 255 })
    .withMessage('Password must contain less than 256 characters.'),
  body('password_confirm')
    .trim()
    .notEmpty()
    .withMessage('Confirm your password.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Enter the same password to match.')
      } else {
        return value
      }
    }),
]

const noteValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Enter title of your note.')
    .isLength({ max: 255 })
    .withMessage('Title must contain less than 256 characters.'),
]

const changePasswordValidator = [
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Enter your current password')
    .isLength({ max: 255 })
    .withMessage('Password must contain less than 256 characters.'),
  body('password_new')
    .trim()
    .notEmpty()
    .withMessage('Enter your new password')
    .isLength({ max: 255 })
    .withMessage('New password must contain less than 256 characters.'),
  body('password_confirm')
    .trim()
    .notEmpty()
    .withMessage('Confirm your new password')
    .custom((value, { req }) => {
      if (value !== req.body.password_new) {
        throw new Error('Enter the same password to match.')
      } else {
        return value
      }
    }),
]

const validateResult = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    next()
  } else {
    errors.array().forEach((err) => {
      req.flash('error', err.msg)
    })
    res.redirect(req.originalUrl)
  }
}

module.exports = {
  loginValidator,
  signupValidator,
  noteValidator,
  changePasswordValidator,
  validateResult,
}
