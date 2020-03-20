const express = require('express')
const { saveAccountData, getAccountData, updateAccountData, deleteAccountData, saveSalaryData, getSalaryData, updateSalaryData } = require('../controllers/account.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.get('/:memberId', checkAuth, getAccountData);

router.post('/', checkAuth, saveAccountData)

router.post('/salary', checkAuth, saveSalaryData)

router.post('/getSalaryData', checkAuth, getSalaryData)

router.post('/editSalary', checkAuth, updateSalaryData)

router.delete('/', checkAuth, deleteAccountData)

router.put('/', checkAuth, updateAccountData)



module.exports = router