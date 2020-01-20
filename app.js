'use strict'

const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const mongoose = require('./config/mongoose.js')
const session = require('express-session')
const app = express()

// Connect to the database.
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// Setup view engine.
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// Serve static files.
app.use(express.static(path.join(__dirname, 'public')))

// Parse application/x-www-form-urlencoded.
app.use(express.urlencoded({ extended: false }))

// setup and use session middleware (https://github.com/expressjs/session)
const sessionOptions = {
  secret: 'keyboard cat', // Change it!!! The secret is used to hash the session with HMAC.
  resave: true, // Resave even if a request is not changing the session.
  saveUninitialized: true // Don't save a created but not modified session.
}

app.use(session(sessionOptions))

app.use((req, res, next) => {
  // flash messages - survives only a round trip
  res.locals.user = req.session.user
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }
  next()
})

app.use('/', require('./routes/homeRouter'))

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
  console.log('Press Ctrl-C to terminate...')
})
