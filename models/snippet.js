'use strict'

const mongoose = require('mongoose')

// Create a schema, with customized error messages.
const snippetSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  snippet: {
    type: String
  },
  author: {
    type: String
  }
})

// Create a model using the schema.
const snippet = mongoose.model('Snippet', snippetSchema)

// Export the model.
module.exports = snippet
