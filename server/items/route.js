const router = require('express').Router()
const { getItems, getAllItems } = require('./model')

router.get('/getAllItems/:catId', getAllItems)
router.get('/getItems', getItems)

module.exports = router
