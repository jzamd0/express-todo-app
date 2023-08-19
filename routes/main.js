const express = require('express')
const bcrypt = require('bcryptjs')

const {
  noteValidator,
  validateResult,
  changePasswordValidator,
} = require('../validators/validators')
const { note, user } = require('../models')

const router = express.Router()

const { isLoggedIn } = require('./helpers')

router.get('/', isLoggedIn, async (req, res) => {
  const notes = await note.findAll({ where: { user_id: req.user.id } })

  res.render('index', { title: 'Home', notes })
})

router.get('/notes/new', isLoggedIn, (req, res) => {
  res.render('note', { note: null })
})

router.post(
  '/notes/new',
  isLoggedIn,
  noteValidator,
  validateResult,
  async (req, res) => {
    await note.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.user.id,
    })

    req.flash('success', 'Note successfully created.')
    res.redirect('/')
  },
)

router.get('/notes/:id', isLoggedIn, async (req, res) => {
  const foundNote = await note.findByPk(req.params.id)
  if (foundNote) {
    res.render('note', { note: foundNote })
  }
})

router.post(
  '/notes/:id',
  isLoggedIn,
  noteValidator,
  validateResult,
  async (req, res) => {
    const foundNote = await note.findByPk(req.params.id)
    if (foundNote) {
      foundNote.title = req.body.title
      foundNote.description = req.body.description
      foundNote.user_id = req.user.id
      await foundNote.save()

      req.flash('success', 'Note successfully updated.')
      res.redirect('/')
    }
  },
)

router.get('/notes/:id/delete', isLoggedIn, async (req, res) => {
  const foundNote = await note.findByPk(req.params.id)
  if (foundNote) {
    await foundNote.destroy()

    req.flash('success', 'Note successfully deleted.')
    res.redirect('/')
  }
})

router.get('/account', isLoggedIn, (req, res) => {
  res.render('account')
})

router.post(
  '/account',
  isLoggedIn,
  changePasswordValidator,
  validateResult,
  async (req, res) => {
    const foundUser = await user.findByPk(req.user.id)
    const { password, password_new } = req.body

    if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
      foundUser.password = bcrypt.hashSync(
        password_new,
        bcrypt.genSaltSync(10),
        null,
      )
      await foundUser.save()

      req.flash('success', 'Password changed successfully.')
      res.redirect('/')
    } else {
      req.flash('error', "Enter your user's password")
      res.redirect(req.originalUrl)
    }
  },
)

router.delete('/account', isLoggedIn, (req, res) => {
  res.send('DELETE account')
})

module.exports = router
