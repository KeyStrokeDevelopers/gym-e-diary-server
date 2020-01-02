import express from 'express'
import { saveRegistrationData } from '../controllers/registration.controllers'
const router = express.Router()

router.get('/', saveRegistrationData)

module.exports = router