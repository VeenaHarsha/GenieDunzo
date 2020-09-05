const router = require('express').Router()

const categoryRoutes = require('../category/route')
const storeRoutes = require('../stores/route')
const items = require('../items/route')
const cart = require('../cart/route')
const users = require('../users/route')
const auth = require('../auth/route')

router.use('/users', users)
router.use('/auth', auth)
router.use('/category', categoryRoutes)
router.use('/stores', storeRoutes)
router.use('/items', items)
router.use('/cart', cart)

module.exports = router
