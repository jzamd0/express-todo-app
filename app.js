const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const mainRouter = require('./routes/main')
const authRouter = require('./routes/auth')

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

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('static'))

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use('/', authRouter)
app.use('/', mainRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})