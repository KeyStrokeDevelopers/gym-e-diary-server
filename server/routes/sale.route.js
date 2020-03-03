const express = require('express')
const { saveSaleData, getSaleData, updateSaleData, deleteInvoiceData, cancelSaleData, getCancelSaleData } = require('../controllers/sale.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getSaleData)

router.get('/cancel', checkAuth, getCancelSaleData)

router.post('/', checkAuth, saveSaleData)

router.post('/getdata', checkAuth, getSaleData)

router.put('/', checkAuth, updateSaleData)

router.delete('/', checkAuth, deleteInvoiceData)

router.post('/cancel', checkAuth, cancelSaleData)

module.exports = router

