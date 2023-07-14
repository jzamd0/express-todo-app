const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('index', { title: "Home" })
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})