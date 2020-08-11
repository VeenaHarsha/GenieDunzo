const router = require('express').Router()
const { getStores, getStoreCategories } = require('./model')

router.get('/getStoresList/:catId', getStores)
router.get('/getStoreCats/:storeId', getStoreCategories)

module.exports = router
