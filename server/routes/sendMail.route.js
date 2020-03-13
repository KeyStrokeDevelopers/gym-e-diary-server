const express = require('express')
const { sendMail } = require('../controllers/sendMail.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.post('/', checkAuth, sendMail)

module.exports = router