import express from 'express'
import { savePurposeData, getPurposeData, updatePurposeData, deletePurposeData } from '../controllers/purpose.controllers'
const router = express.Router()


router.get('/', getPurposeData);

router.post('/', savePurposeData)

router.delete('/', deletePurposeData)

router.put('/', updatePurposeData)



module.exports = router