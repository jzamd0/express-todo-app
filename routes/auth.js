const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const passport = require('passport')

const { loginValidator, signupValidator } = require('./../validators/validators')
const { isLoggedIn, isAnonymous } = require('./helpers')

router.get('/login', isAnonymous, (req, res) => {
    res.render('login', { title: 'Sign in' })
})

router.post('/login', isAnonymous, loginValidator,
    (req, res, next) => {
        const errors = validationResult(req)
        
        if (errors.isEmpty()) {
            next()
        } else {
            req.flash('error', 'Enter username and password')
            res.redirect('/login')
        }
    },
    passport.authenticate('local.login', {
        successRedirect: '/',
        failureRedirect: '/signup'
    })
)

router.get('/signup', isAnonymous, (req, res) => {
    res.render('signup', { title: 'Sign up' })
})

router.post('/signup', signupValidator,
    (req, res, next) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            next()
        } else {
            req.flash('error', 'Enter username and password')
            res.redirect('/signup')
        }
    },
    passport.authenticate('local.signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
    })
)

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(err => {
        res.redirect('/login')
    })
})

module.exports = router