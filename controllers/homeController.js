'use strict'

const Snippet = require('../models/snippet')
const User = require('../models/users')

const index = async (req, res) => {
  const viewData = {
    snippets: (await Snippet.find({}))
      .map(snippet => ({
        id: snippet._id,
        author: snippet.author,
        snippet: snippet.snippet
      }))
  }
  viewData.user = true
  // console.log(req.session.user)
  res.render('home/index', { viewData })
}

const create = async (req, res, next) => {
  const viewData = {
    author: req.session.user,
    snippet: ''
  }
  res.render('home/add', { viewData })
}

const createPost = async (req, res) => {
  try {
    const snippet = new Snippet({
      author: req.session.user,
      snippet: req.body.snippet
    })

    await snippet.save()
    req.session.flash = { type: 'success', text: 'Snippet was created successfully.' }
    res.redirect('/')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('/')
  }
}

const view = (req, res) => {
  Snippet.findById(req.params.id, (err, snippets) => {
    if (err) {
      req.session.flash = { type: 'danger', text: err.message }
    } else {
      res.render('home/viewSnippet', {
        id: snippets.id,
        author: snippets.author,
        snippet: snippets.snippet
      })
    }
  })
}

const edit = (req, res, next) => {
  Snippet.findById(req.params.id, (err, snippets) => {
    if (err || req.session.user !== snippets.author) {
      req.session.flash = { type: 'danger', text: 'Not authorized' }
      res.redirect('/')
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
        req.session.flash = { type: 'danger', text: err.message }
      } else {
        req.session.flash = { type: 'success', text: 'Snippet was updated successfully.' }
        res.redirect('/')
      }
    })
}

const deleteSnippet = async (req, res, next) => {
  Snippet.findById(req.params.id, (err, snippets) => {
    if (err || req.session.user !== snippets.author) {
      req.session.flash = { type: 'danger', text: 'Not authorized' }
      res.redirect('/')
    } else {
      Snippet.deleteOne({ _id: req.params.id },
        { $set: { snippet: req.body.snippet } }, (err, doc) => {
          if (err) {
            req.session.flash = { type: 'danger', text: err.message }
            res.redirect('/')
          } else {
            req.session.flash = { type: 'success', text: 'Snippet was deleted successfully.' }
            res.redirect('/')
          }
        })
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
    req.session.flash = { type: 'success', text: 'New user was registered successfully.' }
    res.render('home/login')
  } else {
    req.session.flash = { type: 'danger', text: 'Passwords do not match' }
  }
}

const login = async (req, res) => {
  await res.render('home/login')
}

const loginPost = async (req, res) => {
  const checkUser = await User.findOne({ username: req.body.username })
  const checkPassword = await checkUser.checkPasswords(req.body.password)

  if (!checkUser) {
    req.session.flash = { type: 'danger', text: 'No user found' }
  } else if (!checkPassword) {
    req.session.flash = { type: 'danger', text: 'Wrong password' }
  } else {
    req.session.flash = { type: 'success', text: 'You logged in successfully.' }
    req.session.user = req.body.username
    res.redirect('/')
  }
}

const logout = async (req, res) => {
  req.session.user = ''
  req.session.flash = { type: 'success', text: 'You logged out.' }
  res.redirect('/login')
}

const ensureAuthentication = async (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    req.session.flash = { type: 'danger', text: 'Unauthorized, you have to login!' }
    res.redirect('/login')
  }
}

module.exports = { index, create, createPost, view, edit, editPost, deleteSnippet, login, register, registerPost, loginPost, logout, ensureAuthentication }
