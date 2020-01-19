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

/*
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err, false, { message: 'Wrong password' })
    }
    return cb(null, isMatch)
  })
}
*/
userSchema.method('checkPasswords', async function (password) {
  return bcrypt.compare(password, this.password)
})

// Create a model using the schema.
const User = mongoose.model('User', userSchema)

// Export the model.
module.exports = User
