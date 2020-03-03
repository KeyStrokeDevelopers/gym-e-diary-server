const express = require('express')
const { savePaymentMethodData, getPaymentMethodData, updatePaymentMethodData, deletePaymentMethodData } = require('../controllers/paymentMethod.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getPaymentMethodData);

router.post('/', checkAuth, savePaymentMethodData);

router.put('/', checkAuth, updatePaymentMethodData);

router.delete('/', checkAuth, deletePaymentMethodData);


module.exports = router