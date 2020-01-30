'use strict'

const express = require('express')
const router = express.Router()

router.get('/', require('../controllers/homeController').index)

router.route('/add')
  .get(require('../controllers/homeController').ensureAuthentication, require('../controllers/homeController').create)
  .post(require('../controllers/homeController').ensureAuthentication, require('../controllers/homeController').createPost)

router.route('/viewSnippet/:id').get(require('../controllers/homeController').view)

router.route('/edit/:id')
  .get(require('../controllers/homeController').ensureAuthentication, require('../controllers/homeController').edit)
  .post(require('../controllers/homeController').ensureAuthentication, require('../controllers/homeController').editPost)

router.route('/delete/:id')
  .get(require('../controllers/homeController').ensureAuthentication, require('../controllers/homeController').deleteSnippet)

router.get('/register', require('../controllers/homeController').register)

router.post('/register', require('../controllers/homeController').registerPost)

router.get('/login', require('../controllers/homeController').login)

router.post('/login', require('../controllers/homeController').loginPost)

router.get('/logout', require('../controllers/homeController').logout)

module.exports = router
