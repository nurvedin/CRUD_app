'use strict'

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
  console.log('Press Ctrl-C to terminate...')
})