import express from 'express'
import { savePaymentMethodData, getPaymentMethodData, updatePaymentMethodData, deletePaymentMethodData } from '../controllers/paymentMethod.controllers'
const router = express.Router()


router.get('/', getPaymentMethodData);

router.post('/', savePaymentMethodData);

router.put('/', updatePaymentMethodData);

router.delete('/', deletePaymentMethodData);


module.exports = router