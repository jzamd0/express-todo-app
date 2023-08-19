const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')

const mainRouter = require('./routes/main')
const authRouter = require('./routes/auth')
const { notFoundHandler } = require('./routes/error')

dotenv.config()

const app = express()

const db = require('./models/index')

db.sequelize
  .sync({ alter: process.env.DB_SYNC })
  .then(() => {
    console.log('Database synced')
  })
  .catch((err) => {
    console.log(`Failed to sync database: ${err.message}`)
  })

app.use(morgan('tiny'))

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  }),
)
app.use(flash())
app.use((req, res, next) => {
  res.locals.flashes = req.flash()
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))

require('./config/passport')

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use(express.static('static'))

app.set('view engine', 'pug')
app.set('views', `${__dirname}/views`)

app.use('/', authRouter)
app.use('/', mainRouter)
app.use(notFoundHandler)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
