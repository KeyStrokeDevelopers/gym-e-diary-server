const express = require('express')
const { saveExpenseIncomeData, getExpenseIncomeData, updateExpenseIncomeData, deleteExpenseIncomeData } = require('../controllers/expenseIncome.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getExpenseIncomeData)

router.post('/', checkAuth, saveExpenseIncomeData)

router.put('/', checkAuth, updateExpenseIncomeData)

router.delete('/', checkAuth, deleteExpenseIncomeData)


module.exports = router