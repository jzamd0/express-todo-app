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
  validateResult,
}
