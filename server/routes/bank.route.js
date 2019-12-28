import express from 'express'
import { saveBankData, getBankData} from '../controllers/bank.controllers'
const router = express.Router()


router.get('/', getBankData);

router.post('/', saveBankData)

router.put('/:bankId', (req, res) => {
    res.send('bank put route')
})

router.delete('/:bankId', (req, res) => {
    res.send('bank delete route')
})


module.exports = router