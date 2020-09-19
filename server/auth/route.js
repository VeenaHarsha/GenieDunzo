const router = require('express').Router()
const { loginUser, getUserDetails } = require('./model')
const authorize = require('../middleware/authorize')

router.get('/user', authorize, getUserDetails)

router.post('/', loginUser)

module.exports = router