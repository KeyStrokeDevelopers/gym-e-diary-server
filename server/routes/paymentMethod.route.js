import express from 'express'
import { savePaymentMethodData, getPaymentMethodData, updatePaymentMethodData, deletePaymentMethodData } from '../controllers/paymentMethod.controllers'
import { checkAuth } from '../auth'

const router = express.Router()

router.get('/', checkAuth, getPaymentMethodData);

router.post('/', checkAuth, savePaymentMethodData);

router.put('/', checkAuth, updatePaymentMethodData);

router.delete('/', checkAuth, deletePaymentMethodData);


module.exports = router