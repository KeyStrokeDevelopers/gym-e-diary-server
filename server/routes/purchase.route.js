const express = require('express')
const { savePurchaseData, getPurchaseData, updatePurchaseData, deleteInvoiceData } = require('../controllers/purchase.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getPurchaseData)

router.post('/', checkAuth, savePurchaseData)

router.post('/getdata', checkAuth, getPurchaseData)

router.put('/', checkAuth, updatePurchaseData)

router.delete('/', checkAuth, deleteInvoiceData)

module.exports = router

