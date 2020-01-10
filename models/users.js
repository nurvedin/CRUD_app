'use strict'

const mongoose = require('mongoose')

// Create a schema, with customized error messages.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Export the model.
module.exports = User
