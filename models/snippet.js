'use strict'

const mongoose = require('mongoose')

// Create a schema, with customized error messages.
const snippetSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  }
})

// Create a model using the schema.
const Snippet = mongoose.model('Snippet', snippetSchema)

// Export the model.
module.exports = Snippet
