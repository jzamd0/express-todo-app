const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const { sequelize } = require('../models/index')
const User = require('../models/user')(sequelize, DataTypes)

passport.use(
  'local.login',
  new LocalStrategy(
    {
      usernamefield: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await User.findOne({ where: { username } })

      if (user && bcrypt.compareSync(password, user.password)) {
        done(null, user)
      } else {
        req.flash('error', 'Username or password does not match')
        done(null, false)
      }
    },
  ),
)

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const user = await User.findOne({ where: { username } })

      console.log(user)
      if (user) {
        req.flash('error', 'Username already exists.')
        return done(null, false)
      }

      const userCreated = await User.create({
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      })

      if (userCreated) {
        req.flash('success', 'User was successfully created.')
        return done(null, userCreated)
      }

      return done(null, false)
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id)

  if (user) {
    done(null, user)
  } else {
    done(user.errors, null)
  }
})
