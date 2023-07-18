const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', { title: "Home" })
})

router.get('/notes/new', (req, res) => {
    res.send('GET notes new')
})

router.post('/notes', (req, res) => {
    res.send('POST note')
})

router.get('/notes/:id', (req, res) => {
    res.send('GET note')
})

router.put('/notes/:id', (req, res) => {
    res.send('PUT note')
})

router.delete('/notes/:id', (req, res) => {
    res.send('DELETE note')
})

router.get('/account', (req, res) => {
    res.send('GET page')
})

router.delete('/account', (req, res) => {
    res.send("DELETE account")
})

module.exports = router