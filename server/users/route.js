const router = require('express').Router()
const { registerUser } = require('./model')

router.post('/register', registerUser)

module.exports = router