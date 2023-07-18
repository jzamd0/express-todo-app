const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.send('GET login')
})

router.post('/login', (req, res) => {
    res.send('POST login')
})

router.get('/signup', (req, res) => {
    res.send('GET signup')
})

router.post('/signup', (req, res) => {
    res.send('POST signup')
})

router.get('/logout', (req, res) => {
    res.send('logout page')
})

module.exports = router