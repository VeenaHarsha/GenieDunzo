const router = require('express').Router()
const { getCategories } = require('./model')
const authorize = require('../middleware/authorize')

router.get('/getCategories', authorize, getCategories)

module.exports = router
