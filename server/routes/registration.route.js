const express = require('express')
const { saveRegistrationData } = require('../controllers/registration.controllers')
const router = express.Router();
router.post('/', saveRegistrationData)

module.exports = router