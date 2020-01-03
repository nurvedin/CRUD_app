'use strict'

const express = require('express')
const router = express.Router()

router.get('/', require('../controllers/homeController').index)
router.route('/add').get(require('../controllers/homeController').addSnippet)

module.exports = router
