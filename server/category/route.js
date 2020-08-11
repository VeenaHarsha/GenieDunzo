const router = require('express').Router()
const { getCategories } = require('./model')

router.get('/getCategories', getCategories)

module.exports = router
