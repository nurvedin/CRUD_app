'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Create a schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password') || user.isNew) {
    const hashed = await bcrypt.hash(user.password, 12)
    user.password = hashed
  }
  next()
})

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Export the model.
module.exports = User
