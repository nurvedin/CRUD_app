'use strict'

const express = require('express')
const hbs = require('express-hbs')
const path = require('path')

const app = express()

app.use('/', require('./routes/homeRouter'))

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
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
  console.log('Press Ctrl-C to terminate...')
})