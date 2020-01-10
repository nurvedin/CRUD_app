'use strict'

const Snippet = require('../models/snippet')
const User = require('../models/users')
// const bcrypt = require('bcryptjs')

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

    res.redirect('/')
  } catch (error) {
    res.redirect('/')
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

const register = async (req, res) => {
  await res.render('home/register')
}

const registerPost = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  })

  if (req.body.password === req.body.password2) {
    await newUser.save()
    res.render('home/login')
  } else {
    console.log('Passwords do not match')
  }
}

const login = async (req, res) => {
  await res.render('home/login')
}

module.exports = { index, create, createPost, view, edit, editPost, deleteSnippet, login, register, registerPost }
