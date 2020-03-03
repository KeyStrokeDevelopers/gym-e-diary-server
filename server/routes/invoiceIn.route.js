const express = require('express')
const { saveInvoiceInData, getInvoiceInData, updateInvoiceInData, deleteInvoiceInData } = require('../controllers/invoiceIn.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.post('/order', checkAuth, getInvoiceInData);

router.post('/', checkAuth, saveInvoiceInData)

router.delete('/', checkAuth, deleteInvoiceInData)

router.put('/', checkAuth, updateInvoiceInData)



module.exports = router