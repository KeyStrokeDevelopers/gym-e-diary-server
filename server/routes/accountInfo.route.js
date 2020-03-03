const express = require('express')
const { saveAccountInfoData, getAccountInfoData, updateAccountInfoData, deleteAccountInfoData } = require('../controllers/accountInfo.controllers')
const { checkAuth } = require('../auth')
const router = express.Router()


router.get('/', checkAuth, getAccountInfoData);

router.post('/', checkAuth, saveAccountInfoData)

router.delete('/', checkAuth, deleteAccountInfoData)

router.put('/', checkAuth, updateAccountInfoData)



module.exports = router