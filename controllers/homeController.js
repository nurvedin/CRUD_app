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

/*
const addSnippet = (req, res) => {
  res.render('partials/add')
}
*/
/*
  const code = [{
    author: 'Nurvedin',
    snippet: 'app.use(express.urlencoded({ extended: true }))'
  },
  {
    author: 'Merita',
    snippet: 'app.use(express.urlencoded({ extended: true }))'
  },
  {
    author: 'Esma',
    snippet: 'app.use(express.urlencoded({ extended: true }))'
  }
  ]
*/

const addSnippet = async (req, res) => {
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
    res.redirect('.')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { index, addSnippet, createPost }

/*
  try {
    const snippet = new Snippet({
      snippet: req.body.snippet
    })

    await snippet.save()

    // ...and redirect and show a message.
    res.redirect('.')
  } catch (error) {
    return res.render('home/add', {
      author: req.body.author,
      snippet: req.body.snippet
    })
  }
*/
