const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { sequelize } = require('../models/index');
const { DataTypes } = require("sequelize")
const User = require('../models/user')(sequelize, DataTypes)
const bcrypt = require('bcryptjs')

passport.use('local.login', new LocalStrategy(
    {
        usernamefield: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, username, password, done) => {
        const user = await User.findOne({ where: { username: username }})

        if (user && bcrypt.compareSync(password, user.password)) {
            done(null, user)
        } else {
            done(null, false, req.flash('error', 'Username or password does not match'))
        }
    }
))

passport.use('local.signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, username, password, done) => {
        const user = await User.findOne( { where: { username: username } })

        console.log(user)
        if (user) {
            return done(null, false, req.flash('error', 'Username already exists'))
        } else {
            const newUser = {
                username: username,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
            }

            await User.create(newUser).then((user) => {
                if (!user) {
                    return done(null, false)
                } else {
                    return done(null, user, req.flash('success', 'User was successfully created'))
                }
            }) 
        }
    }
))

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
