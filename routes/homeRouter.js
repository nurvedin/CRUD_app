'use strict'

const express = require('express')
const router = express.Router()

router.get('/', require('../controllers/homeController').index)
// router.route('/add').post(require('../controllers/homeController').addSnippet)

router.route('/add')
  .get(require('../controllers/homeController').addSnippet)
  .post(require('../controllers/homeController').createPost)

module.exports = router
