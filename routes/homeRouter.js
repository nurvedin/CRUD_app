'use strict'

const express = require('express')
const router = express.Router()

router.get('/', require('../controllers/homeController').index)
// router.route('/add').post(require('../controllers/homeController').addSnippet)

router.route('/add')
  .get(require('../controllers/homeController').create)
  .post(require('../controllers/homeController').createPost)

router.route('/viewSnippet/:id').get(require('../controllers/homeController').view)

router.route('/edit/:id')
  .get(require('../controllers/homeController').edit)
  .post(require('../controllers/homeController').editPost)

module.exports = router
