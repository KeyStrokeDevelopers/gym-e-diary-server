import express from 'express'
import { saveRegistrationData } from '../controllers/registration.controllers'
const router = express.Router()

router.post('/', saveRegistrationData)

module.exports = router