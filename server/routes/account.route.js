const express = require('express')
const { saveAccountData, getAccountData, updateAccountData, deleteAccountData, saveSalaryData, getSalaryData } = require('../controllers/account.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.get('/:memberId', checkAuth, getAccountData);

router.post('/', checkAuth, saveAccountData)

router.post('/salary', checkAuth, saveSalaryData)

router.post('/getSalaryData', checkAuth, getSalaryData)

router.delete('/', checkAuth, deleteAccountData)

router.put('/', checkAuth, updateAccountData)



module.exports = router