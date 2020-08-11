const router = require('express').Router()
const { addCart, updateCart, getCartList, deleteCart } = require('./model')

router.get('/getCartList/:storeId', getCartList)
router.post('/addCart', addCart)
router.put('/updateCart/:id', updateCart)
router.delete('/deleteCart', deleteCart)

module.exports = router
