const { body, validationResult } = require('express-validator')

const loginValidator = [
  body('username').trim().notEmpty().withMessage('Enter your username.'),
  body('password').trim().notEmpty().withMessage('Enter your password.'),
]

const signupValidator = [
  body('username').trim().notEmpty().withMessage('Enter your username.'),
  body('password').trim().notEmpty().withMessage('Enter your password.'),
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
  body('title').trim().notEmpty().withMessage('Enter title of your note.'),
]

const changePasswordValidator = [
  body('password').trim().notEmpty().withMessage('Enter your current password'),
  body('password_new').trim().notEmpty().withMessage('Enter your new password'),
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
    req.flash('error', errors.array()[0].msg)
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
