const express = require('express')
const { saveOrderSummaryData, getOrderSummaryData, updateOrderSummaryData, deleteOrderSummaryData } = require('../controllers/orderSummary.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.get('/', checkAuth, getOrderSummaryData);

router.post('/', checkAuth, saveOrderSummaryData)

router.delete('/', checkAuth, deleteOrderSummaryData)

router.put('/', checkAuth, updateOrderSummaryData)



module.exports = router