const router = require('express').Router()
const { getStores, getStoreCategories, getStoreAddress } = require('./model')
const authorize = require('../middleware/authorize')

router.get('/getStoresList/:catId', authorize, getStores)
router.get('/getStoreAddress/:storeId', authorize, getStoreAddress)
router.get('/getStoreCats/:storeId', authorize, getStoreCategories)

module.exports = router
