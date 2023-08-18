const express = require('express')

const router = express.Router()
const passport = require('passport')

const {
  loginValidator,
  signupValidator,
  validateResult,
} = require('../validators/validators')
const { isLoggedIn, isAnonymous } = require('./helpers')

router.get('/login', isAnonymous, (req, res) => {
  res.render('login', { title: 'Sign in' })
})

router.post(
  '/login',
  isAnonymous,
  loginValidator,
  validateResult,
  passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
)

router.get('/signup', isAnonymous, (req, res) => {
  res.render('signup', { title: 'Sign up' })
})

router.post(
  '/signup',
  signupValidator,
  validateResult,
  passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
  }),
)

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(() => {
    res.redirect('/login')
  })
})

module.exports = router
