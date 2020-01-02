import express from 'express'
import { saveBankData, getBankData, updateBankData, deleteBankData } from '../controllers/bank.controllers'
import { checkAuth } from '../auth';
const router = express.Router()


router.get('/', checkAuth, getBankData);

router.post('/', checkAuth, saveBankData)

router.delete('/', checkAuth, deleteBankData)

router.put('/', checkAuth, updateBankData)



module.exports = router