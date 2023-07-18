const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.render('login', { title: 'Sign in' })
})

router.post('/login', (req, res) => {
    res.redirect('/')
})

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign up' })
})

router.post('/signup', (req, res) => {
    res.redirect('/login')
})

router.get('/logout', (req, res) => {
    res.redirect('/login')
})

module.exports = router