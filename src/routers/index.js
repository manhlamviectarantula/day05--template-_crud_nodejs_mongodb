//Router tổng: đây là nơi tổng hợp lại các router của thằng con
const express = require('express')
const router = express.Router()

router.use('/api/v1/product', require('./product'))

// router.use('/api/v1/user', require('./product'))

module.exports = router