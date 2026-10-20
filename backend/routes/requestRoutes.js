const express = require('express')
const { createRequest, getNearbyMechanics } = require('../controllers/requestController')
const router = express.Router()

router.post('/', createRequest)
router.get('/nearby-mechanics', getNearbyMechanics)

module.exports = router
