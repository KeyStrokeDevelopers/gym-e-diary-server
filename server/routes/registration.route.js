import express from 'express'
import { saveRegistrationData } from '../controllers/package.controllers'
const router = express.Router()

router.get('/', saveRegistrationData)

module.exports = router