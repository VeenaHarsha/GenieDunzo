const router = require('express').Router()
const { getItems, getAllItems } = require('./model')
const authorize = require('../middleware/authorize')

router.get('/getAllItems/:catId', authorize, getAllItems)
router.get('/getItems',authorize, getItems)

module.exports = router
