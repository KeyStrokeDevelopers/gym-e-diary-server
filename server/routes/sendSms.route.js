const express = require('express')
const { sendSms } = require('../controllers/sendSms.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.post('/', checkAuth, sendSms)

module.exports = router