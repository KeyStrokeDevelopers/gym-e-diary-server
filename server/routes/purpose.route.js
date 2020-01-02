import express from 'express'
import { savePurposeData, getPurposeData, updatePurposeData, deletePurposeData } from '../controllers/purpose.controllers'
import { checkAuth } from '../auth'

const router = express.Router()

router.get('/', checkAuth, getPurposeData);

router.post('/', checkAuth, savePurposeData)

router.delete('/', checkAuth, deletePurposeData)

router.put('/', checkAuth, updatePurposeData)



module.exports = router