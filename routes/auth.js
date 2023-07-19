const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')

const { loginValidator, signupValidator } = require('./../validators/validators')

router.get('/login', (req, res) => {
    res.render('login', { title: 'Sign in' })
})

router.post('/login', loginValidator, (req, res) => {
    const errors = validationResult(req)
    
    if (errors.isEmpty()) {
        const username = req.body.username
        const password = req.body.password
        res.redirect('/')
    } else {
        console.log({ errors: errors.array() })
        res.redirect('/login')
    }
})

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign up' })
})

router.post('/signup', signupValidator, (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        const username = req.body.username
        const password = req.body.password
        const passwordConfirm = req.body.password_confirm
    
        res.redirect('/login')
    } else {
        console.log({ errors: errors.array() })
        req.redirect('/signup')
    }
})

router.get('/logout', (req, res) => {
    res.redirect('/login')
})

module.exports = router