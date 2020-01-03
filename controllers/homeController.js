const index = (req, res) => {
  res.render('home/index')
}

const addSnippet = (req, res) => {
  res.render('partials/add')
}

module.exports = { index, addSnippet }
