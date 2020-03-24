const express = require('express')
const { saveExpenseIncomeData, getExpenseIncomeData, updateExpenseIncomeData, deleteExpenseIncomeData, activeExpenseIncomeData } = require('../controllers/expenseIncome.controllers')
const { checkAuth } = require('../auth')

const router = express.Router()

router.get('/', checkAuth, getExpenseIncomeData)

router.get('/active/:dataId', checkAuth, activeExpenseIncomeData)

router.post('/', checkAuth, saveExpenseIncomeData)

router.put('/', checkAuth, updateExpenseIncomeData)

router.delete('/', checkAuth, deleteExpenseIncomeData)


module.exports = router