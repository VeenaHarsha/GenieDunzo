const router = require('express').Router()
const authorize = require('../middleware/authorize')
const { addCart, updateCart, getCartList, deleteCart, deleteAllCart } = require('./model')

router.get('/getCartList', authorize, getCartList)
router.post('/addCart', authorize, addCart)
router.put('/updateCart/:id', updateCart)
router.delete('/deleteCart', deleteCart)
router.delete('/deleteAllCart/:storeId', deleteAllCart)

module.exports = router
