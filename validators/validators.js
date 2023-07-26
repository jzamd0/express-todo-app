const { body } = require('express-validator')

const loginValidator = [
  body('username').trim().notEmpty(),
  body('password').trim().notEmpty(),
]

const signupValidator = [
  body('username').trim().notEmpty(),
  body('password').trim().notEmpty(),
  body('password_confirm')
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords don't match")
      } else {
        return value
      }
    }),
]

module.exports = {
  loginValidator,
  signupValidator,
}
