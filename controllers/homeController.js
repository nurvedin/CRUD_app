'use strict'

const Snippet = require('../models/snippet')

const index = async (req, res) => {
  const viewData = {
    snippets: (await Snippet.find({}))
      .map(snippet => ({
        id: snippet._id,
        author: snippet.author,
        value: snippet.value
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
    value: undefined
  }
  res.render('home/add', { viewData })
}

const createPost = async (req, res) => {
  try {
    const snippet = new Snippet({
      author: req.author,
      snippet: req.snippet
    })

    // ...save the number to the database...
    await snippet.save()
  } catch (error) {
    console.log(error)
  }
}

module.exports = { index, addSnippet, createPost }
