const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const db = require('./models/index')
db.sequelize.sync({ alter: process.env.DB_SYNC })
    .then(() => {
        console.log('Database synced')
    })
    .catch((err) => {
        console.log('Failed to sync database: ' + err.message)
    })
    
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('index', { title: "Home" })
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})