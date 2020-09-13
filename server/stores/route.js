const router = require('express').Router()
const { getStores, getStoreCategories } = require('./model')
const authorize = require('../middleware/auth')

router.get('/getStoresList/:catId', authorize, getStores)
router.get('/getStoreCats/:storeId', getStoreCategories)

module.exports = router
