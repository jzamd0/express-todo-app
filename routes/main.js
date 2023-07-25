const express = require('express')
const router = express.Router()

const { isLoggedIn } = require('./helpers')

router.get('/', isLoggedIn, (req, res) => {
    res.render('index', { title: "Home" })
})

router.get('/notes/new', isLoggedIn, (req, res) => {
    res.send('GET notes new')
})

router.post('/notes', isLoggedIn, (req, res) => {
    res.send('POST note')
})

router.get('/notes/:id', isLoggedIn, (req, res) => {
    res.send('GET note')
})

router.put('/notes/:id', isLoggedIn, (req, res) => {
    res.send('PUT note')
})

router.delete('/notes/:id', isLoggedIn, (req, res) => {
    res.send('DELETE note')
})

router.get('/account', isLoggedIn, (req, res) => {
    res.send('GET page')
})

router.delete('/account', isLoggedIn, (req, res) => {
    res.send("DELETE account")
})

module.exports = router