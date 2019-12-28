import express from 'express'
import { savePaymentMethodData, getPaymentMethodData } from '../controllers/paymentMethod.controllers'
const router = express.Router()


router.get('/', getPaymentMethodData);

router.post('/', savePaymentMethodData);

router.put('/:paymentMethodId', (req, res) => {
    res.send('paymentMethod put route')
})

router.delete('/:paymentMethodId', (req, res) => {
    res.send('paymentMethod delete route')
})


module.exports = router