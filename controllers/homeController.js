'use strict'

const Snippet = require('../models/snippet')

const index = async (req, res) => {
  const viewData = {
    snippets: (await Snippet.find({}))
      .map(snippet => ({
        id: snippet._id,
        author: snippet.author,
        snippet: snippet.snippet
      }))
  }
  res.render('home/index', { viewData })
}

const create = async (req, res) => {
  const viewData = {
    author: '',
    snippet: ''
  }
  res.render('home/add', { viewData })
}

const createPost = async (req, res) => {
  try {
    const snippet = new Snippet({
      author: req.body.author,
      snippet: req.body.snippet
    })

    await snippet.save()

    // ...and redirect and show a message.
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
}

const view = (req, res) => {
  Snippet.findById(req.params.id, (err, snippets) => {
    if (err) {
      console.log(err)
    } else {
      res.render('home/viewSnippet', {
        id: snippets.id,
        author: snippets.author,
        snippet: snippets.snippet
      })
    }
  })
}

const edit = (req, res) => {
  Snippet.findById(req.params.id, (err, snippets) => {
    if (err) {
      console.log(err)
    } else {
      res.render('home/edit', {
        id: snippets.id,
        author: snippets.author,
        snippet: snippets.snippet
      })
    }
  })
}

const editPost = async (req, res) => {
  await Snippet.updateOne({ _id: req.params.id },
    { $set: { snippet: req.body.snippet } }, { new: true }, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/')
      }
    })
}

const deleteSnippet = async (req, res) => {
  await Snippet.deleteOne({ _id: req.params.id },
    { $set: { snippet: req.body.snippet } }, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/')
      }
    })
}

module.exports = { index, create, createPost, view, edit, editPost, deleteSnippet }
