const router = require('express').Router()
const { getCategories, getDeliveries, addToDeliveries, deleteDeliveries } = require('./model')

router.get('/getCategories', getCategories)

router.get('/getDeliveries', getDeliveries)
router.post('/addToDeliveries', addToDeliveries)
router.delete('/deleteDeliveries', deleteDeliveries)

module.exports = router
