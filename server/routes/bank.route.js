import express from 'express'
import { saveBankData, getBankData, updateBankData, deleteBankData } from '../controllers/bank.controllers'
const router = express.Router()


router.get('/', getBankData);

router.post('/', saveBankData)

router.delete('/', deleteBankData)

router.put('/', updateBankData)



module.exports = router