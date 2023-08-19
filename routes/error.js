const notFoundHandler = (req, res) => {
  const err = {
    name: '404. NOT FOUND',
    message: 'Page not found.',
  }
  res.status(404).render('error', { err })
}

const errorHandler = (err, req, res, next) => {
  if (err) {
    req.logout()
    res.redirect('error', err)
  } else {
    next()
  }
}

module.exports = { notFoundHandler, errorHandler }
